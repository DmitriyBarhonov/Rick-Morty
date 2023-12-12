import { useRouter } from "next/router";
import nProgress from "nprogress";
import { useEffect } from "react";

export const useLoader = () => {
  const router = useRouter();

  useEffect(() => {
    const startLoading = () => nProgress.start();
    const endLoading = () => nProgress.done();

    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", endLoading);
    router.events.on("routeChangeError", endLoading);

    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", endLoading);
      router.events.off("routeChangeError", endLoading);
    };
  }, [router]);
}; 
