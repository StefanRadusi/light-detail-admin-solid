import { For } from "solid-js";
import { setPreviewImg } from "~/components/img-preview";
import { PageBanner } from "~/components/layout/PageBanner/PageBanner";
import { Section } from "~/components/layout/Section";
import { SectionHeader } from "~/components/layout/Section/SectionHeader";
import { Project } from "~/types";

type Props = {
  project: Project;
};

export const ProjectPage = (props: Props) => {
  const getBannerTitle = () =>
    `${props.project.title.toLocaleUpperCase()}|PROJECT`;

  return (
    <main class="w-full flex flex-col relative">
      <PageBanner
        id={props.project.id}
        img={props.project.coverImageUrl}
        title={getBannerTitle()}
        subTitle={""}
      />
      <Section>
        <SectionHeader
          title="Description"
          subTitle={
            props.project.description || `Picture of ${props.project.title}`
          }
        />

        <div class="flex flex-wrap gap-6">
          <For each={props.project.imgs}>
            {(img) => (
              <div class="flex-1 overflow-hidden aspect-square min-w-full lg:min-w-[40%] shadow-md">
                <img
                  onClick={() => setPreviewImg(img)}
                  class="w-full h-full object-cover cursor-pointer"
                  src={img}
                  alt={`${props.project.title} - interior design photo`}
                />
              </div>
            )}
          </For>
        </div>
      </Section>
    </main>
  );
};
