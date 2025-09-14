import { Cat, CatIcon, Dog, Heart, LucideMouse, PawPrint, Rabbit } from "lucide-react";
import AutoScroll from "embla-carousel-auto-scroll"
import { Carousel, CarouselContent, CarouselItem } from "~/components/ui/carousel";
import { useIsMobile } from "~/hooks/use-mobile";


export default function Carrossel({ reverse }: { reverse?: boolean }) {
    const mobile = useIsMobile()
    return (
        <div className="lg:h-dvh sm:h-2">
            <Carousel
                plugins={[
                    AutoScroll({
                        playOnInit: true,
                        speed: 1,
                        stopOnMouseEnter: false,
                        stopOnInteraction: false,
                        stopOnFocusIn: false,
                        startDelay: 500
                    })
                ]}
                orientation={mobile ? "horizontal" : "vertical"} opts={{
                    loop: true, direction: reverse ? 'ltr' : 'rtl'
                }}>
                <CarouselContent className="lg:h-dvh  md:h-2">
                    <CarouselItem className="basis-1/4 m-5 flex justify-center items-center align-middle">
                        <PawPrint size={80} className="text-amber-100" />
                    </CarouselItem>
                    <CarouselItem className="basis-1/4 m-5 flex justify-center items-center align-middle">
                        <Cat size={80} className="text-blue-100" />
                    </CarouselItem>
                    <CarouselItem className="basis-1/4 m-5 flex justify-center items-center align-middle ">
                        <Dog size={80} className="text-pink-100" />
                    </CarouselItem>
                    <CarouselItem className="basis-1/4 m-5 flex justify-center items-center">
                        <Heart size={80} className="text-green-100" />
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>
    );
}