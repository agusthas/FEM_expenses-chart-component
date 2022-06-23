import { useEffect, useState } from 'react';

interface Data {
  day: string;
  amount: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [now, _] = useState(new Date());

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className="font-sans bg-pale-orange min-h-screen flex justify-center items-center p-2">
      <div className="w-full max-w-[440px] space-y-4">
        <div className="text-white bg-soft-red flex p-7 rounded-2xl justify-between items-center">
          <div className="space-y-2">
            <p className="text-sm">My balance</p>
            <p className="text-3xl font-bold">$921.48</p>
          </div>
          <img src="/logo.svg" alt="" className="w-16" />
        </div>

        <div className="p-7 text-medium-brown rounded-2xl bg-white shadow-xl">
          {/* Graph */}
          <p className="font-bold text-2xl text-dark-brown">
            Spending - Last 7 days
          </p>
          <div className="divide-y-2 divide-cream">
            <div className="h-[250px] mb-4 grid grid-cols-7 gap-3">
              {data.map((item, i) => (
                <div
                  key={item.day}
                  className="h-full flex flex-col gap-2 justify-end"
                >
                  <div
                    className={`${
                      i === now.getDay() - 1
                        ? 'bg-cyan hover:bg-cyan/40'
                        : 'bg-soft-red hover:bg-soft-red/40'
                    } transition-colors rounded-sm relative group cursor-pointer`}
                    style={{ height: `${item.amount}%` }}
                  >
                    <p className="hidden group-hover:block transition-all absolute -top-9 left-1/2 -translate-x-1/2 p-2 text-sm bg-dark-brown rounded-sm text-white text-center leading-none">
                      ${item.amount}
                    </p>
                  </div>
                  <p className="text-center h-max">{item.day}</p>
                </div>
              ))}
            </div>
            {/* Stats */}
            <div className="pt-4">
              <p className="mb-1">Total this month</p>
              <div className="flex justify-between items-center">
                <p className="text-4xl font-bold text-dark-brown">$478.33</p>
                <div>
                  <p className="text-dark-brown font-bold text-right leading-none">
                    +2.4%
                  </p>
                  <p>from last month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
