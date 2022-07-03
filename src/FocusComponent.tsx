import { useEffect, useRef, useState } from "react";
import axios from "axios";
interface FocusableInputProps {
  shouldFocus: boolean;
}

interface LocationDataResponse {
  country: string;
  lat: number;
  localtime: string;
  localtime_epoch: number;
  lon: number;
  name: string;
  region: string;
  tz_id: string;
}

type LocationData = LocationDataResponse | null;

const FocusableInput: React.FC<FocusableInputProps> = ({ shouldFocus }) => {
  //const inputRef = useRef<HTMLInputElement | null>(null);
  const [data1, setData1] = useState<LocationData>(null);

  useEffect(() => {
    // if (shouldFocus === true) {
    //   inputRef?.current?.focus();
    // }

    fetchRemote();
  }, []);

  async function fetchRemote() {
    // let url = new URL("http://api.weatherapi.com/v1/current.json");
    // const params = { key: "0d8bd3f707594062ae4190516222505", q: "paris" };
    // url.search = new URLSearchParams(params).toString();
    const response = await axios.get(
      "http://api.weatherapi.com/v1/current.json?key=0d8bd3f707594062ae4190516222505&q=paris"
    );
    setData1(response.data.location);
  }

  return (
    <>
      <input />
      <ul>
        <li>
          {data1?.name ? (
            <span data-testid="first-data">{data1?.name}</span>
          ) : null}{" "}
        </li>
      </ul>
    </>
  );
};

export default FocusableInput;
