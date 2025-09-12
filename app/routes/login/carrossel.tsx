import { Cat, CatIcon, Dog, Heart, LucideMouse, PawPrint, Rabbit } from "lucide-react";
import AutoScroll from "embla-carousel-auto-scroll"
import { Carousel, CarouselContent, CarouselItem } from "~/components/ui/carousel";


export default function Carrossel() {
    return (
        <div className="h-dvh">
            <Carousel
                plugins={[
                    AutoScroll({
                        playOnInit: true,
                        speed: 1,
                        stopOnMouseEnter: false,
                        stopOnInteraction: false,
                        stopOnFocusIn: false,
                        startDelay: 500,
                    })
                ]}
                orientation="vertical" opts={{
                    loop: true, axis: 'y', align: 'start', dragFree: true
                }}>
                <CarouselContent className="h-dvh">
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