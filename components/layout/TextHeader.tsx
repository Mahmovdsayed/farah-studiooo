"use client";

interface IProps {
  title: string;
  description: string;
}

const TextHeader = ({ title, description }: IProps) => {
  return (
    <div className="mb-4 text-start lg:w-9/12 lg:mx-auto">
      <h1 className="font-bold text-2xl md:text-4xl mb-2">{title}</h1>
      <p className="text-xs md:text-sm text-muted-foreground lg:w-9/12">
        {description}
      </p>
    </div>
  );
};

export default TextHeader;
