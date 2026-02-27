import { A } from "@solidjs/router";

type Props = {
  title?: string;
  description?: string;
  coverImageUrl?: string;
  path?: string;
};

export const ProjectCard = (props: Props) => {
  return (
    <A href={props.path ?? ""}>
      <div class="w-full h-[600px] flex relative shadow-md">
        <img
          class="w-full h-full object-cover absolute top-0 left-0"
          src={props.coverImageUrl}
          alt={props.title}
        />
        <div class="flex-1 h-full z-10 overflow-hidden group relative">
          <p class="w-full h-full overflow-hidden no-scrollbar bg-black/70 p-6 text-white translate-x-full transition-transform duration-500 group-hover:translate-x-0">
            {props.description}
          </p>
          <div class="w-full h-[100px] absolute left-0 bottom-0 bg-gradient-to-t from-black" />
        </div>
        <div class="w-[100px] h-full bg-black/70 z-10 relative">
          <div class="absolute top-6 left-1/2 rotate-90 ">
            <p class="text-white w-[600px] text-3xl font-bold absolute top-0 left-0 -translate-y-1/2 pr-6">
              {props.title}
            </p>
          </div>
          <div class="w-full h-[100px] absolute left-0 bottom-0 bg-gradient-to-t from-black" />
        </div>
      </div>
    </A>
  );
};
