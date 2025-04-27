import React from 'react';
import styled from 'styled-components';

interface GaugeChartProps {
  title: string;
  data: any;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h3`
  margin-bottom: 10px;
`;

const TotalContainer = styled.div`
  margin-bottom: 10px;
`;

const TotalValue = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 5px;
`;

const TotalLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const GaugeContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const GaugeSegment = styled.div<{ width: string; color: string }>`
  height: 100%;
  width: ${props => props.width};
  background-color: ${props => props.color};
  float: left;
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  margin-bottom: 5px;
`;

const ColorBox = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  background-color: ${props => props.color};
  margin-right: 5px;
  border-radius: 2px;
`;

const GaugeChart: React.FC<GaugeChartProps> = ({ title, data }) => {
  const calculateSegments = () => {
    const total = data.total;
    
    let segments = [];
    if (data.critical) {
      const criticalPercent = (data.critical / total) * 100;
      segments.push({ color: '#8B0000', width: `${criticalPercent}%` });
    }
    
    if (data.high) {
      const highPercent = (data.high / total) * 100;
      segments.push({ color: '#FF4500', width: `${highPercent}%` });
    }
    
    const usedPercent = segments.reduce((acc, seg) => {
      return acc + parseFloat(seg.width);
    }, 0);
    
    if (usedPercent < 100) {
      segments.push({ color: '#E0E0E0', width: `${100 - usedPercent}%` });
    }
    
    return segments;
  };
  
  const segments = calculateSegments();
  
  return (
    <Container>
      <Title>{title}</Title>
      <TotalContainer>
        <TotalValue>{data.total}</TotalValue>
        <TotalLabel>
          {data.vulnerabilities ? 'Total Vulnerabilities' : 'Total Images'}
        </TotalLabel>
      </TotalContainer>
      
      <GaugeContainer>
        {segments.map((segment, index) => (
          <GaugeSegment 
            key={index}
            width={segment.width}
            color={segment.color}
          />
        ))}
      </GaugeContainer>
      
      <Legend>
        {data.critical && (
          <LegendItem>
            <ColorBox color="#8B0000" />
            <span>Critical ({data.critical})</span>
          </LegendItem>
        )}
        {data.high && (
          <LegendItem>
            <ColorBox color="#FF4500" />
            <span>High ({data.high})</span>
          </LegendItem>
        )}
      </Legend>
    </Container>
  );
};

export default GaugeChart; 