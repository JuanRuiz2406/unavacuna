import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const UseIsMounted = () => {
  const [loaded, setloaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setloaded(true);
    }
  }, [router.isReady]);

  return loaded;
};

export default UseIsMounted;
