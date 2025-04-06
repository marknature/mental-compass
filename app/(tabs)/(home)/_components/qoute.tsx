type Props = {
  qoute: {
    quote: string;
    author: string;
  };
};

const Qoute = ({ qoute }: Props) => {
  return (
    <div className=" overflow-hidden rounded-xl bg-border p-5">
      <div className="space-y-3">
        <div>
          <h2 className=" font-semibold ">Daily Motivation</h2>
          <p className="mt-1 text-sm ">{qoute.quote} </p>
        </div>
        <p className="text-xs text-muted-foreground">{qoute.author}</p>
      </div>
    </div>
  );
};

export default Qoute;
