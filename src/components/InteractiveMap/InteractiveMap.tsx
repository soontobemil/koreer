import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from 'react-simple-maps';
import { Box, Paper, Typography, Tooltip } from '@mui/material';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

interface CountryData {
  name: string;
  avgSalary: string;
  popularJobs: string[];
  visaDifficulty: 'Easy' | 'Medium' | 'Hard';
  employmentRate: string;
}

const countryData: { [key: string]: CountryData } = {
  USA: {
    name: "미국",
    avgSalary: "$120,000",
    popularJobs: ["Software Engineer", "Data Scientist", "Product Manager"],
    visaDifficulty: "Medium",
    employmentRate: "96%"
  },
  CAN: {
    name: "캐나다",
    avgSalary: "C$95,000",
    popularJobs: ["Software Developer", "Web Developer", "System Analyst"],
    visaDifficulty: "Easy",
    employmentRate: "94%"
  }
};

export const InteractiveMap: React.FC = () => {
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  return (
    <Box sx={{ 
      width: '100%', 
      height: '600px',
      position: 'relative',
      bgcolor: 'background.paper',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: 3
    }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 150
        }}
      >
        <ZoomableGroup center={[0, 30]} zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isHighlighted = countryData[geo.properties.ISO_A3] !== undefined;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const country = countryData[geo.properties.ISO_A3];
                      if (country) {
                        setTooltipContent(country.name);
                      }
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick={() => {
                      const country = countryData[geo.properties.ISO_A3];
                      if (country) {
                        setSelectedCountry(country);
                      }
                    }}
                    style={{
                      default: {
                        fill: isHighlighted ? "#2196F3" : "#D6D6DA",
                        outline: "none"
                      },
                      hover: {
                        fill: isHighlighted ? "#1976D2" : "#D6D6DA",
                        outline: "none",
                        cursor: isHighlighted ? "pointer" : "default"
                      },
                      pressed: {
                        fill: "#1565C0",
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {tooltipContent && (
        <Paper
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            p: 2,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Typography variant="h6">{tooltipContent}</Typography>
        </Paper>
      )}

      {selectedCountry && (
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            right: 32,
            transform: 'translateY(-50%)',
            p: 3,
            width: 300,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Typography variant="h5" gutterBottom>{selectedCountry.name}</Typography>
          <Typography variant="body1" gutterBottom>평균 연봉: {selectedCountry.avgSalary}</Typography>
          <Typography variant="body1" gutterBottom>취업률: {selectedCountry.employmentRate}</Typography>
          <Typography variant="body1" gutterBottom>비자 난이도: {selectedCountry.visaDifficulty}</Typography>
          <Typography variant="body1">인기 직군:</Typography>
          <ul>
            {selectedCountry.popularJobs.map((job, index) => (
              <li key={index}>{job}</li>
            ))}
          </ul>
        </Paper>
      )}
    </Box>
  );
}; 