import React, { useState } from 'react';
import "./KundliChart.css"

export default function ShowChart() {

    const [prediction , setPrediction] = useState("")

    return (
        <div className="card p-5 m-5">
            <img src="./kundli-img2.jpg" className="img-fluid"/>
            <h1 className="text-center">|| Your Ascendent ||</h1><br/><br/>
            <p>
            <b>What is Ascendent?</b><br></br>

The ascendant house is considered very important in Vedic astrology. During the birth of a person, the sign
which rises in the sky is called the persons ascendant. And, the sign which comes in this house is called the
ascendant sign. The ascendant helps in calculating minutest event in a person's life through astrology. Whereas,
the daily, weekly, monthly and yearly predictions are made on the basis of moon sign and sun sign. 
<br/><hr/>
<b>Your Ascendant is: Pisces</b>
<br/><hr/>
<b>Health for Pisces Ascendant</b><br/>
Pisces deals with the endocrine system and diabetes can cause severe foot problems as well as other difficulties.
Swelling, allergic reaction to drugs, injuries to the feet and related problems are common complaints, but the
Piscean emotional nature can also make them vulnerable to emotional illness.
<br/><hr/>
<b>Temperament & Personality For Pisces Ascendant</b><br/>
Pisces Ascendant people are not practical people but are sensitive and instinctual. They are versatile and tend to
understand things by understanding rather than logic. Rigid in observance of prevailing attitude and can forgo
anything but their orthodoxy. Piscean are confident, loyal, home-loving, kind and generous. They can be easily
misled. Their dreamy and impractical natures are a source of distress to your near and dear ones. Being a
mixture of an optimist and a pessimist, they find difficult to make up their minds on any issue. A typical Pisces
is shy and is an abiding love and trust for all those who come into contact with them. They are eternally
romantic in the classic sense and have well-deserved reputation for hesitant over their own feet. Piscean are
extremely superstitious and religious They possess a gentle, patient nature but the one which needs moulding.
They adapt surroundings whether good or bad; are generous, friendly and good natured with a true sense of
kindness and compassion and yet sensitive to everything around along with the feelings of others.<br/>
Physical Appearance For Pisces Ascendant<br/><hr/>
Pisces Ascendant people are often plump and of average stature because they are a sign of absolute absence of
differentiation. It is the only sign of the Zodiac which can take on many different appearances. The eyes are
often large, attractive, quite fixed or slow, and almost hypnotic. The whole physique gives an impression which
is somehow misty, mysterious, benevolent and quiet. Actually, Pisces' outward appearance is impossible to
classify, similarly to their personality which remains completely elusive!<br/><hr/>
            </p>
        </div>



        // <div className="chart-container">
        //   <div className="row">
        //     <div className="cell">3</div>
        //     <div className="cell">2</div>
        //     <div className="cell">12</div>
        //   </div>
        //   <div className="row">
        //     <div className="cell">4</div>
        //     <div className="cell">As</div>
        //     <div className="cell">11</div>
        //   </div>
        //   <div className="row">
        //     <div className="cell">5</div>
        //     <div className="cell">7</div>
        //     <div className="cell">9</div>
        //   </div>
        //   <div className="row">
        //     <div className="cell">6</div>
        //     <div className="cell">Ra</div>
        //     <div className="cell">8</div>
        //   </div>
        // </div>
      );
}
