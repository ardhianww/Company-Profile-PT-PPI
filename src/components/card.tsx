interface CardProps {
    title: string;
    value: string;
  }
  
  export default function Card({ title, value }: CardProps) {
    return (
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    );
  }
  