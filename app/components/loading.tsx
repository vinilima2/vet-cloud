import { ThreeDot } from "react-loading-indicators";
import { useLoading } from "~/providers/loading-provider";

export default function Loading() {
    const { loading } = useLoading()
    return (
        <>
            {loading &&
                <div className="w-full h-dvh absolute flex items-center justify-center z-20 bg-black/80">
                    <ThreeDot variant="bounce" color="#4B734B" size="large" text="Aguarde..." textColor="" />
                </div>}
        </>
    );
}