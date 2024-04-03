import React from "react";

const Skeleton = (props) => {
  const skeletons = Array.from({ length: props.card }, (_, index) => index);

  return skeletons.map((item) => (
    <div key={item}>
      <div className={`bg-neutral-400/50 w-full ${props.h} animate-pulse rounded-md mb-3`}></div>
      <div className={`bg-neutral-400/50 w-full h-4 animate-pulse rounded-md ${props.text1 ? "block" : "hidden"}`}></div>
      <div className={`bg-neutral-400/50 w-[50%] h-4 animate-pulse rounded-md mb-3 mt-1 ${props.text2 ? "block" : "hidden"} ${props.content}`}></div>
    </div>
  ));
};

export default Skeleton;
