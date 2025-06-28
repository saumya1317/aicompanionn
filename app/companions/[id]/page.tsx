import { getCompanion } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { subjectsColors } from "@/constants";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

const subjectIconMap: Record<string, string> = {
  "computer networks": "cn",
  dbms: "dbms",
  "data structures & algorithms": "dsa",
  oop: "oops",
  "operating systems": "os",
  "software engineering": "sde",
};

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;

  const companion = await getCompanion(id);
  const user = await currentUser();

  if (!user) redirect("/sign-in");
  if (!companion) redirect("/companions");

  const { name, subject, topic, duration } = companion;

  return (
    <main className="pt-24 px-4 flex flex-col gap-8 items-center">
      {/* Header */}
      <article className="flex rounded-border justify-between p-6 w-full max-w-4xl max-md:flex-col">
        <div className="flex items-center gap-4">
          <div
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{
              backgroundColor:
                subjectsColors[subject as keyof typeof subjectsColors],
            }}
          >
            <Image
              src={`/icons/${
                subjectIconMap[subject] ??
                subject.replace(/\s+/g, "_")
              }.png`}
              alt={subject}
              width={35}
              height={35}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{name}</p>
              <span className="subject-badge max-sm:hidden capitalize">
                {subject}
              </span>
            </div>
            <p className="text-lg text-muted-foreground">{topic}</p>
          </div>
        </div>

        <div className="items-start text-xl font-medium max-md:hidden">
          {duration} min
        </div>
      </article>

      {/* Companion interaction */}
      <CompanionComponent
        {...companion}
        companionId={id}
        userName={user.firstName!}
        userImage={user.imageUrl!}
      />
    </main>
  );
};

export default CompanionSession;
