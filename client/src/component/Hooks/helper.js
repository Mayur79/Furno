import { IoStar, IoStarOutline } from "react-icons/io5";

export const Star = ({ rating }) => {
  const ratingStar = Array.from({ length: 5 }, (elm, i) => {
    let number = i + 0.5;
    return (
      <span key={i} className="text-[#FFC700] text-lg md:text-xl">
        {rating >= i + 1 ? (
          <IoStar />
        ) : rating >= number ? (
          <IoStar />
        ) : (
          <IoStarOutline />
        )}
      </span>
    );
  });
  return ratingStar;
};
