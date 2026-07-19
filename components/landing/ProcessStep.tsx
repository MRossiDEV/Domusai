type Props = {
  number: string;
  icon?: any;
  title: string;
  description: string;
};

export default function ProcessStep({
  number,
  icon,
  title,
  description,
}: Props) {
  return (
    <div className="relative grid gap-8 lg:grid-cols-[90px_1fr]">

      <div className="relative">

        <div
          className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-[#d7c3a0]
          bg-white
          text-xs
          font-semibold
          tracking-[0.2em]
          "
        >
          {number}
        </div>

      </div>

      <div>

        <div className="flex flex-row items-start gap-6">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d7c3a0] text-white">
            {icon}
          </div>

          <h3 className="font-serif flex flex-row text-4xl text-neutral-900">
            <span>{title}</span>
          </h3>

        </div>



        <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600">
          {description}
        </p>

      </div>

    </div>
  );
}