import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  title: string;
  data: any;
}

const DonutContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 75%;
  display: flex;
  align-items: center;
`;

const ChartWrapper = styled.div`
  width: 50%;
  max-width: 180px;
  position: relative;
  margin-right: 20px;
`;

const TotalLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.3rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TotalText = styled.span`
  font-size: 0.7rem;
  color: #555;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  margin-left: 10px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const ColorBox = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  background-color: ${props => props.color};
  margin-right: 8px;
  border-radius: 50%;
`;

const LegendText = styled.span`
  font-size: 0.75rem;
  color: #555;
`;

const BottomLegendContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  justify-content: center;
  margin-top: 10px;
`;

const DonutChart: React.FC<DonutChartProps> = ({ title, data }) => {
  if (title === 'Cloud Accounts') {
    // Cloud Accounts chart data
    const chartData = {
      labels: ['Connected', 'Not Connected'],
      datasets: [
        {
          data: [data.connected, data.notConnected],
          backgroundColor: ['#4169E1', '#E0E0E0'],
          borderWidth: 0,
        },
      ],
    };

    const options = {
      cutout: '75%',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false
        }
      },
      maintainAspectRatio: false,
    };

    return (
      <DonutContainer>
        <ChartContainer>
          <ChartWrapper>
            <Doughnut data={chartData} options={options} />
            <TotalLabel>
              <span>{data.total}</span>
              <TotalText>Total</TotalText>
            </TotalLabel>
          </ChartWrapper>
          <LegendContainer>
            <LegendItem>
              <ColorBox color="#4169E1" />
              <LegendText>Connected ({data.connected})</LegendText>
            </LegendItem>
            <LegendItem>
              <ColorBox color="#E0E0E0" />
              <LegendText>Not Connected ({data.notConnected})</LegendText>
            </LegendItem>
          </LegendContainer>
        </ChartContainer>
      </DonutContainer>
    );
  } else if (title === 'Cloud Account Risk Assessment') {
    // Risk Assessment chart data
    const chartData = {
      labels: ['Failed', 'Warning', 'Not available', 'Passed'],
      datasets: [
        {
          data: [data.failed, data.warning, data.notAvailable, data.passed],
          backgroundColor: ['#FF0000', '#FFA500', '#E0E0E0', '#008000'],
          borderWidth: 0,
        },
      ],
    };

    const options = {
      cutout: '75%',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false
        }
      },
      maintainAspectRatio: false,
    };

    return (
      <DonutContainer>
        <ChartContainer>
          <ChartWrapper>
            <Doughnut data={chartData} options={options} />
            <TotalLabel>
              <span>{data.total}</span>
              <TotalText>Total</TotalText>
            </TotalLabel>
          </ChartWrapper>
          <LegendContainer>
            <LegendItem>
              <ColorBox color="#FF0000" />
              <LegendText>Failed ({data.failed})</LegendText>
            </LegendItem>
            <LegendItem>
              <ColorBox color="#FFA500" />
              <LegendText>Warning ({data.warning})</LegendText>
            </LegendItem>
            <LegendItem>
              <ColorBox color="#E0E0E0" />
              <LegendText>Not available ({data.notAvailable})</LegendText>
            </LegendItem>
            <LegendItem>
              <ColorBox color="#008000" />
              <LegendText>Passed ({data.passed})</LegendText>
            </LegendItem>
          </LegendContainer>
        </ChartContainer>
      </DonutContainer>
    );
  } else if (title === 'Ticket Summary') {
    // Ticket Summary chart data
    const chartData = {
      labels: ['Open', 'In Progress', 'Resolved', 'Closed'],
      datasets: [
        {
          data: [data.open, data.inProgress, data.resolved, data.closed],
          backgroundColor: ['#FF6B6B', '#FFD166', '#06D6A0', '#118AB2'],
          borderWidth: 0,
        },
      ],
    };

    const options = {
      cutout: '75%',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false
        }
      },
      maintainAspectRatio: false,
    };

    return (
      <DonutContainer>
        <ChartContainer>
          <ChartWrapper>
            <Doughnut data={chartData} options={options} />
            <TotalLabel>
              <span>{data.total}</span>
              <TotalText>Total</TotalText>
            </TotalLabel>
          </ChartWrapper>
          <LegendContainer>
            <LegendItem>
              <ColorBox color="#FF6B6B" />
              <LegendText>Open ({data.open})</LegendText>
            </LegendItem>
            <LegendItem>
              <ColorBox color="#FFD166" />
              <LegendText>In Progress ({data.inProgress})</LegendText>
            </LegendItem>
            <LegendItem>
              <ColorBox color="#06D6A0" />
              <LegendText>Resolved ({data.resolved})</LegendText>
            </LegendItem>
            <LegendItem>
              <ColorBox color="#118AB2" />
              <LegendText>Closed ({data.closed})</LegendText>
            </LegendItem>
          </LegendContainer>
        </ChartContainer>
      </DonutContainer>
    );
  } else if (title === 'Open Tickets') {
    // Open Tickets chart data
    const chartData = {
      labels: ['Critical', 'High', 'Medium', 'Low'],
      datasets: [
        {
          data: [data.critical, data.high, data.medium, data.low],
          backgroundColor: ['#D00000', '#E85D04', '#EE9B00', '#94D2BD'],
          borderWidth: 0,
        },
      ],
    };

    const options = {
      cutout: '75%',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false
        }
      },
      maintainAspectRatio: false,
    };

    return (
      <DonutContainer>
        <ChartContainer>
          <ChartWrapper>
            <Doughnut data={chartData} options={options} />
            <TotalLabel>
              <span>{data.total}</span>
              <TotalText>Total</TotalText>
            </TotalLabel>
          </ChartWrapper>
          <LegendContainer>
            <LegendItem>
              <ColorBox color="#D00000" />
              <LegendText>Critical ({data.critical})</LegendText>
            </LegendItem>
            <LegendItem>
              <ColorBox color="#E85D04" />
              <LegendText>High ({data.high})</LegendText>
            </LegendItem>
            <LegendItem>
              <ColorBox color="#EE9B00" />
              <LegendText>Medium ({data.medium})</LegendText>
            </LegendItem>
            <LegendItem>
              <ColorBox color="#94D2BD" />
              <LegendText>Low ({data.low})</LegendText>
            </LegendItem>
          </LegendContainer>
        </ChartContainer>
      </DonutContainer>
    );
  }

  // Default fallback for other donut charts
  return (
    <DonutContainer>
      <ChartContainer>
        <ChartWrapper>
          <Doughnut 
            data={{
              labels: ['No Data'],
              datasets: [{
                data: [1],
                backgroundColor: ['#ccc'],
                borderWidth: 0
              }]
            }} 
            options={{
              cutout: '75%',
              plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
              },
              maintainAspectRatio: false
            }} 
          />
          <TotalLabel>
            <span>0</span>
            <TotalText>No Data</TotalText>
          </TotalLabel>
        </ChartWrapper>
      </ChartContainer>
    </DonutContainer>
  );
};

export default DonutChart; 