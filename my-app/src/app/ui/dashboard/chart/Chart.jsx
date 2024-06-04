"use client"
import styles from './chart.module.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = () => {


    const data = [
        {
          name: 'Mon',
          checkedin: 4000,
          checkedout: 2400,
        },
        {
            name: 'Tue',
            checkedin: 3900,
            checkedout: 2400,
          },
          {
            name: 'Wed',
            checkedin: 3700,
            checkedout: 2000,
          },
          {
            name: 'Thu',
            checkedin: 4000,
            checkedout: 2400,
          },
          {
            name: 'Fri',
            checkedin: 4200,
            checkedout: 200,
          },
          {
            name: 'Sat',
            checkedin: 900,
            checkedout: 5600,
          },
      ];





  return (
    <div className={styles.container}>
   <h1 className={styles.title}>Weekly Recap</h1>
   <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="checkedin" stroke="#8884d8" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="checkedout" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
