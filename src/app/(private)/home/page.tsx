// app/dashboard/page.tsx
'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'

const data = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 1900 },
  { name: 'Mar', total: 1500 },
  { name: 'Apr', total: 2200 },
  { name: 'May', total: 2800 },
  { name: 'Jun', total: 2400 },
]

export default function Dashboard() {
  return (
    <ScrollArea className='w-full h-full'>
            <main className="flex-1 overflow-hidden p-7 border-[#0b4200] rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { title: 'Total Users', value: '10,483' },
            { title: 'Revenue', value: '$54,237' },
            { title: 'Active Projects', value: '12' },
          ].map((stat) => (
            <div
              key={stat.title}
              className="bg-[#f5ffe9] dark:bg-gray-800 p-6 rounded-lg shadow"
            >
              <h3 className="text-lg font-semibold mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-[#f5ffe9] dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#f5ffe9] dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <ul className="space-y-4">
            {[
              {
                activity: 'New user registered',
                detail: 'Jane Smith',
                time: '2 hours ago',
              },
              {
                activity: 'Project "Alpha" completed',
                detail: 'Team Awesome',
                time: '1 day ago',
              },
              {
                activity: 'New order received',
                detail: 'Order #1234',
                time: '3 days ago',
              },
            ].map((item, index) => (
              <li key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.activity}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.detail}
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </ScrollArea>
  )
}
