import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const StatisticsPanel = ({ statistics }) => {
  const monthlyData = [
    { month: 'Ene', consultations: 45, completed: 42 },
    { month: 'Feb', consultations: 52, completed: 48 },
    { month: 'Mar', consultations: 38, completed: 35 },
    { month: 'Abr', consultations: 61, completed: 58 },
    { month: 'May', consultations: 55, completed: 52 },
    { month: 'Jun', consultations: 67, completed: 63 }
  ];

  const diagnosisData = [
    { name: 'Respiratorio', value: 35, color: '#1B4B8C' },
    { name: 'Cardiovascular', value: 25, color: '#2D5AA0' },
    { name: 'Digestivo', value: 20, color: '#E8B931' },
    { name: 'Neurológico', value: 12, color: '#059669' },
    { name: 'Otros', value: 8, color: '#D97706' }
  ];

  const productivityData = [
    { doctor: 'Dr. Usuario', consultations: 89, avgTime: '12 min' },
    { doctor: 'Dr. Rodríguez', consultations: 76, avgTime: '15 min' },
    { doctor: 'Dra. Martínez', consultations: 82, avgTime: '11 min' },
    { doctor: 'Dr. López', consultations: 65, avgTime: '18 min' }
  ];

  const StatCard = ({ title, value, subtitle, icon, trend, trendValue }) => (
    <div className="bg-card rounded-medical medical-border p-medical-lg">
      <div className="flex items-center justify-between mb-medical-sm">
        <div className="flex items-center space-x-medical-sm">
          <div className="w-10 h-10 bg-primary/10 rounded-medical flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <h3 className="text-sm font-heading font-semibold text-foreground">{title}</h3>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${trend === 'up' ? 'text-success' : 'text-error'}`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
            <span className="text-xs font-caption font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-heading font-bold text-foreground mb-1">{value}</p>
        <p className="text-sm font-caption text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-medical-lg">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-medical-lg">
        <StatCard
          title="Total Consultas"
          value="1,247"
          subtitle="Este mes"
          icon="FileText"
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Completadas"
          value="1,189"
          subtitle="95.3% tasa de éxito"
          icon="CheckCircle"
          trend="up"
          trendValue="+5%"
        />
        <StatCard
          title="Tiempo Promedio"
          value="14 min"
          subtitle="Por consulta"
          icon="Clock"
          trend="down"
          trendValue="-2 min"
        />
        <StatCard
          title="Validaciones"
          value="1,156"
          subtitle="97.2% validadas"
          icon="Shield"
          trend="up"
          trendValue="+3%"
        />
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-medical-lg">
        {/* Monthly Volume Chart */}
        <div className="bg-card rounded-medical-lg medical-border p-medical-lg">
          <div className="flex items-center justify-between mb-medical-lg">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Volumen Mensual de Consultas
            </h3>
            <div className="flex items-center space-x-medical-sm">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-xs font-caption text-muted-foreground">Total</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-xs font-caption text-muted-foreground">Completadas</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.2)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(107,114,128,0.2)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="consultations" fill="#1B4B8C" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Diagnosis Distribution */}
        <div className="bg-card rounded-medical-lg medical-border p-medical-lg">
          <div className="flex items-center justify-between mb-medical-lg">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Distribución por Diagnóstico
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diagnosisData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {diagnosisData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(107,114,128,0.2)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-medical-sm mt-medical-sm">
            {diagnosisData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-xs font-caption text-muted-foreground">
                  {item?.name} ({item?.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Doctor Productivity */}
      <div className="bg-card rounded-medical-lg medical-border p-medical-lg">
        <div className="flex items-center justify-between mb-medical-lg">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Productividad por Médico
          </h3>
          <Button variant="outline" size="sm" iconName="Download">
            Exportar
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b medical-border">
              <tr>
                <th className="text-left py-medical-sm text-sm font-heading font-semibold text-foreground">
                  Médico
                </th>
                <th className="text-right py-medical-sm text-sm font-heading font-semibold text-foreground">
                  Consultas
                </th>
                <th className="text-right py-medical-sm text-sm font-heading font-semibold text-foreground">
                  Tiempo Promedio
                </th>
                <th className="text-right py-medical-sm text-sm font-heading font-semibold text-foreground">
                  Eficiencia
                </th>
              </tr>
            </thead>
            <tbody>
              {productivityData?.map((doctor, index) => (
                <tr key={index} className="border-b medical-border last:border-b-0">
                  <td className="py-medical-sm">
                    <div className="flex items-center space-x-medical-sm">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-sm font-heading font-semibold text-secondary-foreground">
                          {doctor?.doctor?.split(' ')?.[1]?.[0]}
                        </span>
                      </div>
                      <span className="text-sm font-body text-foreground">{doctor?.doctor}</span>
                    </div>
                  </td>
                  <td className="text-right py-medical-sm">
                    <span className="text-sm font-body text-foreground">{doctor?.consultations}</span>
                  </td>
                  <td className="text-right py-medical-sm">
                    <span className="text-sm font-body text-foreground">{doctor?.avgTime}</span>
                  </td>
                  <td className="text-right py-medical-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-success rounded-full"
                          style={{ width: `${(doctor?.consultations / 100) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-caption text-muted-foreground">
                        {Math.round((doctor?.consultations / 100) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;