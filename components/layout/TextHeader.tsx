"use client";

interface IProps {
  title: string;
  description: string;
  isDashboard?: boolean;
}

const TextHeader = ({ title, description, isDashboard }: IProps) => {
  return (
    <div
      className={
        isDashboard
          ? "mt-3 mb-6 text-start "
          : "mb-4 text-start lg:w-9/12 lg:mx-auto"
      }
    >
      <h1 className="font-bold text-2xl md:text-4xl mb-2">{title}</h1>
      <p className="text-xs md:text-sm text-muted-foreground lg:w-9/12">
        {description}
      </p>
    </div>
  );
};

export default TextHeader;
