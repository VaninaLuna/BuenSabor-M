import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import './../../styles/Home.css'

export function Home() {

    const carruselItems = [];
    for (let i = 1; i < 6; i++) {
        carruselItems.push(
            <CCarouselItem key={`promo${i}`}>
                <CImage className="d-block img-carousel" src={`./promociones/promo${i}.jpg`} alt={`promo${i}`} />
            </CCarouselItem>

        );
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <h1 style={{ margin: '30px', alignSelf: "center" }}>Nuestras Promociones</h1>
            </div>
            <div className="d-flex flex-column w-100 justify-content-center m-auto">
                <CCarousel controls transition="crossfade" indicators dark>
                    {carruselItems}
                </CCarousel>
            </div>
        </>
    );
}
