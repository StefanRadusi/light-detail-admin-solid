type Props = {
  title: string;
  subTitle: string;
};

export const SectionHeader = (props: Props) => {
  return (
    <div class="flex gap-4 flex-col my-14 lg:flex-row lg:items-start lg:gap-6">
      <h2 class="text-4xl lg:min-w-[380px] uppercase">{props.title}</h2>
      <div class="h-2 border-b-4 lg:border-r-4 border-black lg:self-stretch lg:h-[unset]" />
      <p class="text-gray-500 lg:pt-16">{props.subTitle}</p>
    </div>
  );
};
