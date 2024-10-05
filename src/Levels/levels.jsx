import MapLevel3 from '../Levels/MapLevel3';
import MapLevel3B from '../Levels/MapLevel3B';
import FingerPrintPanel from '../Levels/FingerPrintPanel';
import Level2 from './Level2';

const levels = {
    1: {
      title: "Different epochs, Same threat",
      cards: [
        {
          title: 'Why Not Mars',
          description: 'Scientists are searching for a new planet to explore, and many ask, “Why not Mars?”',
          thumbnail: '/level1/card1.png',
          content: (
            <div>
              <p>Well, the atmosphere is key if you’re thinking of leaving Earth behind. Mars has a thin atmosphere—95% carbon dioxide, with small amounts of nitrogen and argon. It’s not breathable, and with barely any air pressure, you’d need a suit just to survive.</p>
              <img src="/level1/mars.gif" alt="Mars" className="mt-4"
                style={
                  {
                    width: "55%",
                    margin: "auto",
                    marginTop: "12px",
                    marginBottom: "12px",
                    height: "auto",
                    borderRadius: "12px"
                  }
                }
              />
              <p><b>Interesting fact:</b> 4.5 billion years ago, Earth’s atmosphere wasn’t too different. It was filled with water vapor, carbon dioxide, and nitrogen due to volcanic activity—no oxygen to breathe.</p>
            </div>
          )
        },
        {
          title: 'Pleistocene',
          description: 'Careful, or you’ll drift away, like the beasts from Pleistocene’s day!',
          thumbnail: '/ice.jpeg',
          content: (
            <div>
              <p className='text-center'>The Pleistocene Epoch, known as the "Ice Age," was a period of dramatic climate shifts, with glaciers advancing and retreating. It was home to iconic megafauna:</p>
              <div className="cards">
                <div className="card hover:-translate-y-2">
                  <img src="/level1/Irish_Elk.jpg" alt="Mammoth" />
                  <h2 className='font-bold'>Mammoth</h2>
                  <p className="text-sm text-gray-100 leading-5">Features Had enormous antlers, spanning up to 3.6 meters (12 feet) across.
                    Habitat Roamed Europe, Asia, and North Africa.
                    Extinction Died out about 7,700 years ago, possibly due to habitat changes and hunting.</p>
                </div>
                <div className="card hover:-translate-y-2">
                  <img src="/level1/woolly-mammoth.jpg" alt="woolly-mammoth" />
                  <h2 className='font-bold'>Woolly-mammoth</h2>
                  <p className="text-sm text-gray-100 leading-5">Woolly mammoths were 3 to 3.7 meters tall, weighed up to 7,300 kg, and had thick fur and fat for insulation. They were herbivores, eating tundra plants.</p>
                </div>
                <div className="text-center card hover:-translate-y-2">
                  <img src="/level1/mastodon.jpg" alt="Mastodon" />
                  <h2 className='font-bold text-center'>Mastodon</h2 >
                  <p className="text-sm text-gray-100 leading-5">Features: Similar to woolly mammoths but with straighter tusks and different teeth adapted for browsing.
                    Habitat: Inhabited forests and woodlands across North America.
                    Extinction: Extinct around 10,000 years ago, likely due to climate changes and human activity. </p>
                </div>
              </div>
            </div>
          )
        },
      ]
    },
    2: {
      title: "Different epochs, Same threat",
      
      component: Level2,
    },
    3: {
      title: "N2o Interactive Map",
      component: MapLevel3
    },
    4: {
      title: "CO2 Interactive Map",
      component: MapLevel3B
    },
    5:{
      title:"Quiz",
      component:FingerPrintPanel
    }
};

export default levels;