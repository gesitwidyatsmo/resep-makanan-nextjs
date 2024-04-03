const ImageHero = () => {
  return (
    <div className='w-40 h-40 md:w-52 md:h-52 lg:w-96 lg:h-96 relative flex justify-center items-center'>
      <img className='absolute' src='/Hero/salad.webp' alt='salad' />
      <img className='w-8 lg:w-16 h-14 lg:h-24 md left-0 top-0 md:top-4 absolute origin-top-left rotate-[-13deg] ' src='/Hero/parsley.webp' alt='coriander' />
      <img className='w-8 lg:w-16 h-12 lg:h-24 right-0 top-0 md:top-4 absolute origin-top-left -rotate-3' src='/Hero/coriander.webp' alt='salad' />
      <img
        className='w-8 lg:w-16 h-12 lg:h-24 left-7 lg:left-14 bottom-0 lg:bottom-5 md:bottom-4 absolute origin-top-left rotate-[160deg] transform scale-y-[-1]'
        src='/Hero/coriander.webp'
        alt='coriander'
      />
      <img className='w-8 lg:w-16 h-14 lg:h-24 right-[-25px] bottom-0 md:bottom-4 absolute origin-top-left rotate-[35deg] transform' src='/Hero/parsley.webp' alt='parsley' />
    </div>
  );
};

export default ImageHero;
