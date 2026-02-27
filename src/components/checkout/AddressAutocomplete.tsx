"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect: (place: {
    streetAddress: string;
    city: string;
    province: string;
    postalCode: string;
  }) => void;
  placeholder?: string;
  className?: string;
}

const PROVINCE_MAP: Record<string, string> = {
  "Eastern Cape": "Eastern Cape",
  "Free State": "Free State",
  "Gauteng": "Gauteng",
  "KwaZulu-Natal": "KwaZulu-Natal",
  "Limpopo": "Limpopo",
  "Mpumalanga": "Mpumalanga",
  "North West": "North West",
  "Northern Cape": "Northern Cape",
  "Western Cape": "Western Cape",
};

function getComponent(
  components: google.maps.GeocoderAddressComponent[],
  type: string
): string {
  return components.find((c) => c.types.includes(type))?.long_name ?? "";
}

function mapProvince(adminArea: string): string {
  for (const [key, value] of Object.entries(PROVINCE_MAP)) {
    if (
      adminArea.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(adminArea.toLowerCase())
    ) {
      return value;
    }
  }
  return "";
}

let googleScriptLoaded = false;
let googleScriptLoading = false;
const loadCallbacks: (() => void)[] = [];

function loadGoogleMaps(apiKey: string): Promise<void> {
  if (googleScriptLoaded) return Promise.resolve();

  return new Promise((resolve) => {
    if (googleScriptLoading) {
      loadCallbacks.push(resolve);
      return;
    }

    googleScriptLoading = true;
    loadCallbacks.push(resolve);

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      googleScriptLoaded = true;
      googleScriptLoading = false;
      loadCallbacks.forEach((cb) => cb());
      loadCallbacks.length = 0;
    };
    document.head.appendChild(script);
  });
}

export function AddressAutocomplete({
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Start typing your address...",
  className,
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [ready, setReady] = useState(false);

  // Use refs to avoid stale closures in the Google Maps event listener
  const onChangeRef = useRef(onChange);
  const onPlaceSelectRef = useRef(onPlaceSelect);
  onChangeRef.current = onChange;
  onPlaceSelectRef.current = onPlaceSelect;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!apiKey) return;

    loadGoogleMaps(apiKey).then(() => {
      setReady(true);
    });
  }, [apiKey]);

  useEffect(() => {
    if (!ready || !inputRef.current || autocompleteRef.current) return;

    autocompleteRef.current = new google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country: "za" },
        types: ["address"],
        fields: ["address_components", "formatted_address"],
      }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (!place?.address_components) return;

      const components = place.address_components;

      const streetNumber = getComponent(components, "street_number");
      const route = getComponent(components, "route");
      const subpremise = getComponent(components, "subpremise");
      const streetAddress = [subpremise, streetNumber, route]
        .filter(Boolean)
        .join(" ");

      const city =
        getComponent(components, "locality") ||
        getComponent(components, "sublocality") ||
        getComponent(components, "administrative_area_level_2");

      const adminArea = getComponent(
        components,
        "administrative_area_level_1"
      );
      const province = mapProvince(adminArea);
      const postalCode = getComponent(components, "postal_code");

      // Call onPlaceSelect first so parent updates all fields
      onPlaceSelectRef.current({ streetAddress, city, province, postalCode });

      // Update street address via onChange
      onChangeRef.current(streetAddress);

      // Google Autocomplete sets the DOM input to the full formatted address
      // AFTER this callback. Use requestAnimationFrame to override it.
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.value = streetAddress;
        }
      });
    });

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [ready]);

  if (!apiKey) {
    return (
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />
    );
  }

  return (
    <Input
      ref={inputRef}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      autoComplete="off"
    />
  );
}
