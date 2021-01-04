import { CarouselProvider } from './components/CarouselProvider';
import { Slider } from './components/Slider';
import { SliderInner } from './components/SliderInner';
import { LeftButton } from './components/LeftButton';
import { RightButton } from './components/RightButton';
import './App.scss';

const items = [1,2,3,4,5,6,7,8,9,10]

function App() {
    return (
        <div className="App">
            <CarouselProvider
                itemsCount={10} //required
                visibleSlides={9} //max=itemsCount, min=1
                currentSlide={0} //max=itemsCount, min=0
                slideHeightCoeff={16/9} //slideWight/sliderHeight
                loop={true}
                innerPadding={16}
            >
                
                <LeftButton />
                <Slider>
                    <SliderInner items={items} />
                </Slider>
                <RightButton />
                
            </CarouselProvider>
        </div>
    );
}

export default App;
