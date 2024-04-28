import React, { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import { getItem } from "../../../../helpers/api";
import "./voices.scss";

const Voices = () => {
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const data = [
    {
      name: "Рязань",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
  ];

  const getPath = (x: number, y: number, width: number, height: number) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props: any) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const fetchData = async () => {
    const response = await getItem("/api/v1/voices/get_top_10");
    const data = response.data;
    if (response.status >= 200 && response.status < 300) {
      console.log(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <section className="voices">
      <div className="voices__wrapper">
        <div className="container">
          <h2 className="voices__title mb-4">Гистограмма голосов</h2>
        </div>
        <div className="container p-0">
          <div className="voices__mapbox d-flex justify-content-center">
            <BarChart
              width={800}
              height={500}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar
                dataKey="uv"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Voices;
