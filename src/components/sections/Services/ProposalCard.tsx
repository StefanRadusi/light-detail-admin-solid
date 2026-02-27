import { For, Show } from "solid-js";
import { HiSolidCheck, HiSolidStar } from "solid-icons/hi";
import clsx from "clsx";

type ProposalCardProps = {
  id: number;
  title: string;
  img: string;
  subTitle: string;
  description: string;
  descriptionFooter?: string;
  services: { type: string; text: string }[];
  isBestValue?: boolean;
};

export const ProposalCard = (props: ProposalCardProps) => {
  const array = Array.from({ length: props.id }, (_, i) => i + 1);

  const getRotationValue = (length: number) => {
    switch (length) {
      case 1:
        return 0;
      case 2:
        return 45;
      case 3:
        return 30;

      default:
        return 0;
    }
  };

  return (
    <div class="flex flex-col flex-1 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 min-w-[300px]">
      <div class="w-full relative overflow-hidden">
        <img
          src={props.img}
          alt={props.title}
          class="w-full h-[200px] lg:h-[246px] object-cover"
        />
        <Show when={props.isBestValue}>
          <div class="absolute top-0 left-0 bg-brandYellow rounded-br-md">
            <p class="p-3 text-white">BEST VALUE</p>
          </div>
        </Show>

        <div class="absolute w-[180px] h-[180px] bg-brandYellow right-[-90px] bottom-[-90px] rounded-full" />
        <For each={array}>
          {(rotation) => (
            <div
              class={clsx(
                "absolute border-2 border-white border-solid w-[30px] h-[30px] right-[15px] bottom-[15px]"
              )}
              style={`transform: rotate(${
                rotation * getRotationValue(array.length)
              }deg)`}
            />
          )}
        </For>
      </div>
      <div class="px-[16px] py-[32px] gap-4 flex flex-col">
        <div class="flex flex-col">
          <h3 class="text-xl">{props.title}</h3>
          <p class="text-xs uppercase">{props.subTitle}</p>
        </div>
        <p>{props.description}</p>

        <Show when={props.descriptionFooter}>
          <p class="font-bold">{props.descriptionFooter}</p>
        </Show>

        <ul class="space-y-2">
          <For each={props.services}>
            {(service) => (
              <li class="flex gap-2">
                {service.type === "premium" ? (
                  <HiSolidStar class="text-yellow-500 text-lg flex-shrink-0" />
                ) : (
                  <HiSolidCheck class="text-green-600 text-lg flex-shrink-0" />
                )}
                <span class="text-sm">{service.text}</span>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
};
