type Props = {
  coverImageUrl: string;
  name: string;
  author: string;
  description: string;
};

export const StaffCard = (props: Props) => {
  return (
    <div class="flex flex-col gap-4 lg:flex-row lg:gap-28 lg:items-end">
      <div class="flex flex-col gap-4 lg:flex-1 relative lg:max-w-[400px]">
        <h3 class="text-3xl font-bold text-brandYellow lg:absolute bottom-0 left-full lg:origin-bottom-left lg:-rotate-90 lg:text-6xl lg:translate-x-20">
          {props.name}
        </h3>
        <div class="h-[300px] shadow-md overflow-hidden lg:h-auto">
          <img src={props.coverImageUrl} alt={`${props.name} - Light Detail Studio`} />
        </div>
      </div>
      <div class="flex flex-col gap-2 flex-1 ">
        <p>{props.description}</p>
        <p class="text-gray-500">- {props.author}</p>
      </div>
    </div>
  );
};
