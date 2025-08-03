import React from "react";

function Card() {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  // Adjust the threshold value to control the tilt effect
  const threshold = 12;

  const handleMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: y * -threshold, y: x * threshold });
  };

  const Data = [
    {
      id: 1,
      src: "https://rukminim2.flixcart.com/image/416/416/xif0q/shoe/w/f/7/-original-imahd2pfvmdgy23m.jpeg?q=70&crop=false",
      "card name": "URBANBOX",
      "some detail": "Featuring a smart silhouette, these men's sneakers blend aesthetic appeal with comfort effortlessly. The sleek design elevates casual outfits, making it a versatile choice for any wardrobe.",
    },
    {
      id: 2,
      src: "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/v/e/s/9-fashion-star-white-9-hotstyle-black-original-imahdvzs2fzjazbj.jpeg?q=70&crop=false",
      "card name": "HOTSTYLE ",
      "some detail": "Give yourself the advantage of comfortable feet while you flaunt your style. In these shoes from Hotstyle, you can make an impression and how! The crafting of this pair with lace up ensures that your feet have a perfect fit.",
    },
    {
      id: 3,
      src:"https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/g/n/7/10-5g-845-10-campus-mod-blu-wht-original-imah9bgw6y4v9hva.jpeg?q=70&crop=false",
      "card name": "CAMPUS",
      "some detail": "Shoes' Upper- Get ready to slay every day in these men's sports shoes with a supportive design and a soothing knitted vamp that feels super soft on your skin. The lace-up closure ensures a perfect fit, keeping your feet secure.",
    },
    {
      id: 4,
      src: "https://rukminim2.flixcart.com/image/416/416/xif0q/shoe/y/j/h/8-11-sticker-grey-8-hotstyle-white-grey-original-imahehykmfnmptuf.jpeg?q=70&crop=false",
      "card name": "SMOKE-GREY-9 Training & Gym Shoes For Men",
      "some detail": "Upgrade Your Everyday Look with HOTSTYLE 's Lace-Up Walking Shoes! Let your feet relax for hours on end on the PVC Sole, while Mesh Upper gives you a cool look as you flaunt around the round toes.",
    },
    {
      id: 5,
      src: "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/r/t/e/7-htop-308-green-7-bruton-green-original-imahc6gjcaku5kat.jpeg?q=70&crop=false",
      "card name": "Trendy & Stylish Sports Shoes High Tops For Men",
      "some detail": "Shoes' Upper- Get ready to slay every day in these men's Casual shoes with a supportive design that feels super soft on your skin. The lace-up closure ensures a perfect fit, keeping your feet secure.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
      {Data.map((item) => (
        <TiltCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function TiltCard({ item }) {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const threshold = 12;

  const handleMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: y * -threshold, y: x * threshold });
  };

  return (
    <div
      className="rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer max-w-80 bg-white"
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      <img src={item.src} alt={item["card name"]} className="w-full h-52 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {item["card name"]}
        </h3>
        <p className="text-sm text-gray-600">
          {item["some detail"]}
        </p>
      </div>
    </div>
  );
}


export default Card;
