import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Rating,
  LinearProgress,
} from '@mui/material';
import {
  Search,
  LocationOn,
  Business,
  People,
  Info,
  Star,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface CompanyInfo {
  id: number;
  name: string;
  logo: string;
  location: string;
  industry: string;
  size: string;
  rating: number;
  salaryRange: string;
  benefits: string[];
  description: string;
  culture: {
    workLifeBalance: number;
    careerGrowth: number;
    compensation: number;
    culture: number;
  };
}

export function CompanyInformation() {
  const [searchTerm, setSearchTerm] = useState('');

  const companies: CompanyInfo[] = [
    {
      id: 1,
      name: 'Apple',
      logo: '/companies/apple-logo.png',
      location: 'Cupertino, CA',
      industry: 'Technology, Consumer Electronics',
      size: '160,000+ employees',
      rating: 4.4,
      salaryRange: '$125K - $350K',
      benefits: ['Health Insurance', '401(k) Match', 'RSUs', 'Education Reimbursement'],
      description: 'Global technology company known for iPhone, Mac, and innovative consumer electronics',
      culture: {
        workLifeBalance: 80,
        careerGrowth: 90,
        compensation: 95,
        culture: 90,
      },
    },
    {
      id: 2,
      name: 'Amazon',
      logo: '/companies/amazon-logo.png',
      location: 'Seattle, WA',
      industry: 'E-commerce, Cloud Computing',
      size: '1,600,000+ employees',
      rating: 4.2,
      salaryRange: '$120K - $250K',
      benefits: ['Health Insurance', '401(k)', 'RSUs', 'Flexible Work'],
      description: 'World\'s largest e-commerce and cloud computing company',
      culture: {
        workLifeBalance: 75,
        careerGrowth: 90,
        compensation: 95,
        culture: 85,
      },
    },
    {
      id: 3,
      name: 'Microsoft',
      logo: '/companies/microsoft-logo.png',
      location: 'Redmond, WA',
      industry: 'Software, Cloud Computing',
      size: '180,000+ employees',
      rating: 4.3,
      salaryRange: '$130K - $270K',
      benefits: ['Comprehensive Health Insurance', '401(k) Match', 'RSUs', 'Unlimited PTO'],
      description: 'Global leader in software and cloud services',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 4,
      name: 'Google',
      logo: '/companies/google-logo.png',
      location: 'Mountain View, CA',
      industry: 'Technology, Internet Services',
      size: '150,000+ employees',
      rating: 4.5,
      salaryRange: '$140K - $300K',
      benefits: ['Top-tier Health Insurance', '401(k)', 'GSUs', 'Unlimited PTO'],
      description: 'World\'s leading internet services and AI company',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 95,
        compensation: 95,
        culture: 95,
      },
    },
    {
      id: 5,
      name: 'Meta',
      logo: '/companies/meta-logo.png',
      location: 'Menlo Park, CA',
      industry: 'Social Media, Technology',
      size: '70,000+ employees',
      rating: 4.3,
      salaryRange: '$130K - $280K',
      benefits: ['Comprehensive Benefits', '401(k)', 'RSUs', 'Wellness Programs'],
      description: 'Leading social technology company focused on connecting people',
      culture: {
        workLifeBalance: 80,
        careerGrowth: 90,
        compensation: 95,
        culture: 85,
      },
    },
    {
      id: 6,
      name: 'Shopify',
      logo: '/companies/shopify-logo.png',
      location: 'Ottawa, ON',
      industry: 'E-commerce, Technology',
      size: '10,000+ employees',
      rating: 4.4,
      salaryRange: 'CAD 100K - 280K',
      benefits: ['Remote-First', 'Health Benefits', 'Equity', 'Learning Budget'],
      description: 'Leading e-commerce platform empowering merchants worldwide',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 85,
        compensation: 85,
        culture: 95,
      },
    },
    {
      id: 7,
      name: 'Salesforce',
      logo: '/companies/salesforce-logo.png',
      location: 'San Francisco, CA',
      industry: 'Cloud Computing, SaaS',
      size: '70,000+ employees',
      rating: 4.4,
      salaryRange: '$135K - 290K',
      benefits: ['Health Benefits', '401(k) Match', 'Stock Purchase Plan', 'Volunteer Time'],
      description: 'World\'s leading CRM platform with strong focus on social responsibility',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 95,
      },
    },
    {
      id: 8,
      name: 'Adobe',
      logo: '/companies/adobe-logo.png',
      location: 'San Jose, CA',
      industry: 'Software, Creative Tools',
      size: '25,000+ employees',
      rating: 4.3,
      salaryRange: '$130K - 280K',
      benefits: ['Health Benefits', '401(k) Match', 'RSUs', 'Sabbatical'],
      description: 'Global leader in creative software and digital experiences',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 9,
      name: 'RBC',
      logo: '/companies/rbc-logo.png',
      location: 'Toronto, ON',
      industry: 'Banking, Financial Services',
      size: '85,000+ employees',
      rating: 4.1,
      salaryRange: 'CAD 85K - 200K',
      benefits: ['Comprehensive Benefits', 'Pension Plan', 'Stock Purchase', 'Professional Development'],
      description: 'Canada\'s largest bank with strong focus on digital transformation',
      culture: {
        workLifeBalance: 80,
        careerGrowth: 80,
        compensation: 85,
        culture: 85,
      },
    },
    {
      id: 10,
      name: 'Netflix',
      logo: '/companies/netflix-logo.png',
      location: 'Los Gatos, CA',
      industry: 'Entertainment, Technology',
      size: '12,000+ employees',
      rating: 4.3,
      salaryRange: '$150K - 400K',
      benefits: ['Top Market Salary', 'Stock Options', 'Unlimited PTO', 'Travel Support'],
      description: 'Leading streaming entertainment service known for innovative culture',
      culture: {
        workLifeBalance: 80,
        careerGrowth: 85,
        compensation: 100,
        culture: 90,
      },
    },
    // Adding more top companies...
    {
      id: 11,
      name: 'Intel',
      logo: '/assets/img/companies/intel-logo.png',
      location: 'Santa Clara, CA',
      industry: 'Semiconductors, Technology',
      size: '120,000+ employees',
      rating: 4.2,
      salaryRange: '$110K - 250K',
      benefits: ['Health Benefits', '401(k)', 'Bonuses', 'Stock Purchase Plan'],
      description: 'Global leader in semiconductor design and manufacturing',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 85,
        culture: 85,
      },
    },
    {
      id: 12,
      name: 'TD Bank',
      logo: '/assets/img/companies/td-logo.png',
      location: 'Toronto, ON',
      industry: 'Banking, Financial Services',
      size: '90,000+ employees',
      rating: 4.0,
      salaryRange: 'CAD 80K - 190K',
      benefits: ['Health Benefits', 'Pension Plan', 'Employee Banking Benefits', 'Training Programs'],
      description: 'Major Canadian bank with strong presence in retail and digital banking',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 80,
        compensation: 80,
        culture: 85,
      },
    },
    {
      id: 13,
      name: 'Nvidia',
      logo: '/assets/img/companies/nvidia-logo.png',
      location: 'Santa Clara, CA',
      industry: 'Semiconductors, AI Technology',
      size: '22,000+ employees',
      rating: 4.4,
      salaryRange: '$140K - $300K',
      benefits: ['Competitive Health Plans', '401(k)', 'Stock Purchase Plan', 'Flexible Schedule'],
      description: 'Leader in AI computing and graphics processing technology',
      culture: {
        workLifeBalance: 80,
        careerGrowth: 90,
        compensation: 95,
        culture: 90,
      },
    },
    {
      id: 14,
      name: 'BMO',
      logo: '/assets/img/companies/bmo-logo.png',
      location: 'Toronto, ON',
      industry: 'Banking, Financial Services',
      size: '45,000+ employees',
      rating: 4.0,
      salaryRange: 'CAD 75K - 180K',
      benefits: ['Health Coverage', 'Pension Plan', 'Performance Bonuses', 'Work-Life Programs'],
      description: 'Major Canadian bank with strong digital innovation focus',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 80,
        compensation: 80,
        culture: 85,
      },
    },
    {
      id: 15,
      name: 'ServiceNow',
      logo: '/assets/img/companies/servicenow-logo.png',
      location: 'Santa Clara, CA',
      industry: 'Enterprise Software, Cloud Computing',
      size: '20,000+ employees',
      rating: 4.3,
      salaryRange: '$130K - $270K',
      benefits: ['Comprehensive Benefits', 'RSUs', 'Learning Credits', 'Wellness Programs'],
      description: 'Leading digital workflow and enterprise cloud computing company',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 16,
      name: 'Cisco',
      logo: '/assets/img/companies/cisco-logo.png',
      location: 'San Jose, CA',
      industry: 'Networking Technology',
      size: '80,000+ employees',
      rating: 4.2,
      salaryRange: '$120K - $260K',
      benefits: ['Health Insurance', '401(k)', 'Stock Purchase', 'Time Off'],
      description: 'Global leader in networking and communication technology',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 85,
        compensation: 85,
        culture: 90,
      },
    },
    {
      id: 17,
      name: 'CIBC',
      logo: '/assets/img/companies/cibc-logo.png',
      location: 'Toronto, ON',
      industry: 'Banking, Financial Services',
      size: '45,000+ employees',
      rating: 4.0,
      salaryRange: 'CAD 75K - 175K',
      benefits: ['Health Benefits', 'Pension Plan', 'Employee Banking', 'Development Programs'],
      description: 'Major Canadian financial institution with digital innovation focus',
      culture: {
        workLifeBalance: 80,
        careerGrowth: 80,
        compensation: 80,
        culture: 85,
      },
    },
    {
      id: 18,
      name: 'Oracle',
      logo: '/assets/img/companies/oracle-logo.png',
      location: 'Austin, TX',
      industry: 'Enterprise Software, Cloud Computing',
      size: '140,000+ employees',
      rating: 4.0,
      salaryRange: '$115K - $250K',
      benefits: ['Medical Coverage', '401(k)', 'Stock Awards', 'Education Reimbursement'],
      description: 'Leading provider of enterprise software and cloud solutions',
      culture: {
        workLifeBalance: 80,
        careerGrowth: 85,
        compensation: 85,
        culture: 80,
      },
    },
    {
      id: 19,
      name: 'VMware',
      logo: '/assets/img/companies/vmware-logo.png',
      location: 'Palo Alto, CA',
      industry: 'Cloud Computing, Virtualization',
      size: '35,000+ employees',
      rating: 4.2,
      salaryRange: '$125K - $270K',
      benefits: ['Health Benefits', '401(k)', 'RSUs', 'Learning Allowance'],
      description: 'Leader in cloud computing and virtualization technology',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 90,
        culture: 85,
      },
    },
    {
      id: 20,
      name: 'Workday',
      logo: '/assets/img/companies/workday-logo.png',
      location: 'Pleasanton, CA',
      industry: 'Enterprise Software, Cloud Computing',
      size: '15,000+ employees',
      rating: 4.3,
      salaryRange: '$130K - $280K',
      benefits: ['Comprehensive Benefits', 'Stock Purchase Plan', 'Time Off', 'Wellness Programs'],
      description: 'Provider of enterprise cloud applications for finance and HR',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 85,
        compensation: 90,
        culture: 95,
      },
    },
    {
      id: 21,
      name: 'Intuit',
      logo: '/assets/img/companies/intuit-logo.png',
      location: 'Mountain View, CA',
      industry: 'Financial Software',
      size: '14,000+ employees',
      rating: 4.3,
      salaryRange: '$130K - $270K',
      benefits: ['Health Benefits', '401(k) Match', 'RSUs', 'Wellness Programs'],
      description: 'Leading provider of financial software for consumers and small businesses',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 22,
      name: 'CGI',
      logo: '/assets/img/companies/cgi-logo.png',
      location: 'Montreal, QC',
      industry: 'IT Services, Consulting',
      size: '80,000+ employees',
      rating: 3.9,
      salaryRange: 'CAD 70K - 160K',
      benefits: ['Health Insurance', 'Share Purchase Plan', 'Training Programs', 'Flexible Hours'],
      description: 'Global IT consulting firm providing end-to-end services',
      culture: {
        workLifeBalance: 80,
        careerGrowth: 75,
        compensation: 75,
        culture: 80,
      },
    },
    {
      id: 23,
      name: 'Twilio',
      logo: '/assets/img/companies/twilio-logo.png',
      location: 'San Francisco, CA',
      industry: 'Cloud Communications',
      size: '8,000+ employees',
      rating: 4.2,
      salaryRange: '$135K - $280K',
      benefits: ['Comprehensive Benefits', 'RSUs', 'Remote Work', 'Learning Credits'],
      description: 'Leading cloud communications platform for developers',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 24,
      name: 'OpenText',
      logo: '/assets/img/companies/opentext-logo.png',
      location: 'Waterloo, ON',
      industry: 'Enterprise Information Management',
      size: '14,000+ employees',
      rating: 3.8,
      salaryRange: 'CAD 75K - 170K',
      benefits: ['Health Benefits', 'RRSP Matching', 'Stock Purchase', 'Professional Development'],
      description: 'Leader in Enterprise Information Management software',
      culture: {
        workLifeBalance: 80,
        careerGrowth: 75,
        compensation: 75,
        culture: 80,
      },
    },
    {
      id: 25,
      name: 'Square',
      logo: '/assets/img/companies/square-logo.png',
      location: 'San Francisco, CA',
      industry: 'Financial Technology',
      size: '12,000+ employees',
      rating: 4.3,
      salaryRange: '$130K - $280K',
      benefits: ['Full Healthcare', 'Stock Options', 'Wellness Stipend', 'Remote Work'],
      description: 'Innovative financial services and digital payments company',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 95,
      },
    },
    {
      id: 26,
      name: 'Slack',
      logo: '/assets/img/companies/slack-logo.png',
      location: 'San Francisco, CA',
      industry: 'Business Communication',
      size: '3,000+ employees',
      rating: 4.4,
      salaryRange: '$140K - $290K',
      benefits: ['Premium Benefits', 'RSUs', 'Learning Stipend', 'Remote First'],
      description: 'Leading business communication and collaboration platform',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 85,
        compensation: 95,
        culture: 95,
      },
    },
    {
      id: 27,
      name: 'Constellation Software',
      logo: '/assets/img/companies/constellation-logo.png',
      location: 'Toronto, ON',
      industry: 'Software Solutions',
      size: '25,000+ employees',
      rating: 3.9,
      salaryRange: 'CAD 80K - 180K',
      benefits: ['Health Coverage', 'Performance Bonuses', 'Training', 'Work-Life Balance'],
      description: 'Acquirer and manager of vertical market software businesses',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 80,
        compensation: 80,
        culture: 80,
      },
    },
    {
      id: 28,
      name: 'DocuSign',
      logo: '/assets/img/companies/docusign-logo.png',
      location: 'San Francisco, CA',
      industry: 'Digital Transaction Management',
      size: '7,000+ employees',
      rating: 4.2,
      salaryRange: '$125K - $260K',
      benefits: ['Comprehensive Benefits', 'Stock Options', 'Remote Work', 'Wellness Programs'],
      description: 'Leader in electronic signature and digital transaction management',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 29,
      name: 'Lightspeed',
      logo: '/assets/img/companies/lightspeed-logo.png',
      location: 'Montreal, QC',
      industry: 'Point of Sale Software',
      size: '3,000+ employees',
      rating: 4.0,
      salaryRange: 'CAD 75K - 170K',
      benefits: ['Full Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Provider of cloud-based commerce solutions for retailers and restaurants',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 80,
        culture: 90,
      },
    },
    {
      id: 30,
      name: 'Splunk',
      logo: '/assets/img/companies/splunk-logo.png',
      location: 'San Francisco, CA',
      industry: 'Data Analytics',
      size: '7,500+ employees',
      rating: 4.2,
      salaryRange: '$135K - $285K',
      benefits: ['Comprehensive Benefits', 'RSUs', 'Education Reimbursement', 'Flexible PTO'],
      description: 'Leading platform for searching, monitoring, and analyzing machine-generated data',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 85,
      },
    },
    {
      id: 31,
      name: 'Atlassian',
      logo: '/assets/img/companies/atlassian-logo.png',
      location: 'San Francisco, CA',
      industry: 'Software Development Tools',
      size: '8,000+ employees',
      rating: 4.4,
      salaryRange: '$140K - $290K',
      benefits: ['Comprehensive Benefits', 'RSUs', 'Remote Work', 'Learning & Development'],
      description: 'Leading provider of team collaboration and productivity software',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 90,
        compensation: 90,
        culture: 95,
      },
    },
    {
      id: 32,
      name: 'Telus',
      logo: '/assets/img/companies/telus-logo.png',
      location: 'Vancouver, BC',
      industry: 'Telecommunications',
      size: '90,000+ employees',
      rating: 4.0,
      salaryRange: 'CAD 70K - 160K',
      benefits: ['Health Benefits', 'Pension Plan', 'Employee Discounts', 'Work From Home'],
      description: 'Leading Canadian telecommunications company with strong digital focus',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 80,
        compensation: 80,
        culture: 85,
      },
    },
    {
      id: 33,
      name: 'Datadog',
      logo: '/assets/img/companies/datadog-logo.png',
      location: 'New York, NY',
      industry: 'Cloud Monitoring',
      size: '4,000+ employees',
      rating: 4.3,
      salaryRange: '$140K - $300K',
      benefits: ['Premium Benefits', 'RSUs', 'Learning Budget', 'Flexible Work'],
      description: 'Leading platform for cloud-scale monitoring and analytics',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 95,
        culture: 90,
      },
    },
    {
      id: 34,
      name: 'Ceridian',
      logo: '/assets/img/companies/ceridian-logo.png',
      location: 'Toronto, ON',
      industry: 'HR Software',
      size: '5,000+ employees',
      rating: 4.0,
      salaryRange: 'CAD 80K - 175K',
      benefits: ['Health Benefits', 'Stock Purchase Plan', 'Wellness Programs', 'Remote Work'],
      description: 'Global human capital management software company',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 80,
        compensation: 80,
        culture: 85,
      },
    },
    {
      id: 35,
      name: 'Okta',
      logo: '/assets/img/companies/okta-logo.png',
      location: 'San Francisco, CA',
      industry: 'Identity Management',
      size: '5,000+ employees',
      rating: 4.2,
      salaryRange: '$135K - $280K',
      benefits: ['Comprehensive Benefits', 'RSUs', 'Learning Credits', 'Flexible PTO'],
      description: 'Leading identity and access management platform',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 36,
      name: 'Rogers',
      logo: '/assets/img/companies/rogers-logo.png',
      location: 'Toronto, ON',
      industry: 'Telecommunications',
      size: '25,000+ employees',
      rating: 3.9,
      salaryRange: 'CAD 75K - 165K',
      benefits: ['Health Benefits', 'Pension Plan', 'Employee Discounts', 'Training Programs'],
      description: 'Major Canadian telecommunications and media company',
      culture: {
        workLifeBalance: 80,
        careerGrowth: 75,
        compensation: 80,
        culture: 80,
      },
    },
    {
      id: 37,
      name: 'Snowflake',
      logo: '/assets/img/companies/snowflake-logo.png',
      location: 'Bozeman, MT',
      industry: 'Data Cloud',
      size: '5,000+ employees',
      rating: 4.3,
      salaryRange: '$145K - $310K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote Work', 'Learning Allowance'],
      description: 'Leading data cloud platform provider',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 95,
        compensation: 95,
        culture: 90,
      },
    },
    {
      id: 38,
      name: 'Kinaxis',
      logo: '/assets/img/companies/kinaxis-logo.png',
      location: 'Ottawa, ON',
      industry: 'Supply Chain Software',
      size: '1,000+ employees',
      rating: 4.1,
      salaryRange: 'CAD 85K - 180K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Provider of cloud-based supply chain management solutions',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 85,
        culture: 90,
      },
    },
    {
      id: 39,
      name: 'MongoDB',
      logo: '/assets/img/companies/mongodb-logo.png',
      location: 'New York, NY',
      industry: 'Database Software',
      size: '4,000+ employees',
      rating: 4.3,
      salaryRange: '$140K - $290K',
      benefits: ['Comprehensive Benefits', 'RSUs', 'Learning Budget', 'Flexible Work'],
      description: 'Leading modern database platform company',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 40,
      name: 'Coveo',
      logo: '/assets/img/companies/coveo-logo.png',
      location: 'Quebec City, QC',
      industry: 'AI Search Solutions',
      size: '1,000+ employees',
      rating: 4.1,
      salaryRange: 'CAD 80K - 175K',
      benefits: ['Full Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Provider of AI-powered search and recommendations solutions',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 80,
        culture: 90,
      },
    },
    {
      id: 41,
      name: 'Palantir',
      logo: '/assets/img/companies/palantir-logo.png',
      location: 'Denver, CO',
      industry: 'Data Analytics, Software',
      size: '3,000+ employees',
      rating: 4.1,
      salaryRange: '$140K - $300K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote Work', 'Learning Budget'],
      description: 'Provider of data analytics and software solutions for complex problems',
      culture: {
        workLifeBalance: 80,
        careerGrowth: 90,
        compensation: 95,
        culture: 85,
      },
    },
    {
      id: 42,
      name: 'Bell',
      logo: '/assets/img/companies/bell-logo.png',
      location: 'Montreal, QC',
      industry: 'Telecommunications',
      size: '50,000+ employees',
      rating: 3.9,
      salaryRange: 'CAD 70K - 160K',
      benefits: ['Health Benefits', 'Pension Plan', 'Employee Discounts', 'Training Programs'],
      description: 'Major Canadian telecommunications and media company',
      culture: {
        workLifeBalance: 80,
        careerGrowth: 75,
        compensation: 80,
        culture: 80,
      },
    },
    {
      id: 43,
      name: 'Stripe',
      logo: '/assets/img/companies/stripe-logo.png',
      location: 'San Francisco, CA',
      industry: 'Financial Technology',
      size: '7,000+ employees',
      rating: 4.4,
      salaryRange: '$150K - $320K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote Work', 'Learning Credits'],
      description: 'Leading online payment processing platform for businesses',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 95,
        culture: 95,
      },
    },
    {
      id: 44,
      name: 'Descartes',
      logo: '/assets/img/companies/descartes-logo.png',
      location: 'Waterloo, ON',
      industry: 'Logistics Software',
      size: '2,000+ employees',
      rating: 3.9,
      salaryRange: 'CAD 75K - 170K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Provider of logistics and supply chain management software solutions',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 80,
        compensation: 80,
        culture: 85,
      },
    },
    {
      id: 45,
      name: 'Unity',
      logo: '/assets/img/companies/unity-logo.png',
      location: 'San Francisco, CA',
      industry: 'Game Development, Software',
      size: '5,000+ employees',
      rating: 4.2,
      salaryRange: '$130K - $280K',
      benefits: ['Comprehensive Benefits', 'RSUs', 'Remote Work', 'Learning Budget'],
      description: 'Leading platform for creating and operating interactive real-time 3D content',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 46,
      name: 'Manulife',
      logo: '/assets/img/companies/manulife-logo.png',
      location: 'Toronto, ON',
      industry: 'Financial Services, Insurance',
      size: '35,000+ employees',
      rating: 4.0,
      salaryRange: 'CAD 75K - 180K',
      benefits: ['Health Benefits', 'Pension Plan', 'Stock Purchase', 'Wellness Programs'],
      description: 'Major financial services and insurance provider with digital transformation focus',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 80,
        compensation: 80,
        culture: 85,
      },
    },
    {
      id: 47,
      name: 'Roblox',
      logo: '/assets/img/companies/roblox-logo.png',
      location: 'San Mateo, CA',
      industry: 'Gaming, Technology',
      size: '2,000+ employees',
      rating: 4.2,
      salaryRange: '$140K - $300K',
      benefits: ['Comprehensive Benefits', 'RSUs', 'Remote Work', 'Learning Credits'],
      description: 'Leading platform for user-generated gaming and social experiences',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 48,
      name: 'Hootsuite',
      logo: '/assets/img/companies/hootsuite-logo.png',
      location: 'Vancouver, BC',
      industry: 'Social Media Management',
      size: '1,000+ employees',
      rating: 4.0,
      salaryRange: 'CAD 75K - 170K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Leading social media management platform provider',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 80,
        culture: 90,
      },
    },
    {
      id: 49,
      name: 'Zoom',
      logo: '/assets/img/companies/zoom-logo.png',
      location: 'San Jose, CA',
      industry: 'Video Communications',
      size: '7,000+ employees',
      rating: 4.3,
      salaryRange: '$130K - $280K',
      benefits: ['Comprehensive Benefits', 'RSUs', 'Remote Work', 'Wellness Programs'],
      description: 'Leading provider of video communications and collaboration solutions',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 50,
      name: 'D2L',
      logo: '/assets/img/companies/d2l-logo.png',
      location: 'Kitchener, ON',
      industry: 'Education Technology',
      size: '1,000+ employees',
      rating: 4.0,
      salaryRange: 'CAD 75K - 165K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Provider of learning management systems and educational technology solutions',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 80,
        culture: 90,
      },
    },
    {
      id: 51,
      name: 'Airbnb',
      logo: '/assets/img/companies/airbnb-logo.png',
      location: 'San Francisco, CA',
      industry: 'Travel Technology',
      size: '6,000+ employees',
      rating: 4.3,
      salaryRange: '$140K - $300K',
      benefits: ['Premium Benefits', 'RSUs', 'Travel Credits', 'Remote Work'],
      description: 'Leading platform for vacation rentals and unique travel experiences',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 95,
        culture: 95,
      },
    },
    {
      id: 52,
      name: 'Wealthsimple',
      logo: '/assets/img/companies/wealthsimple-logo.png',
      location: 'Toronto, ON',
      industry: 'Financial Technology',
      size: '1,000+ employees',
      rating: 4.1,
      salaryRange: 'CAD 85K - 180K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Learning Budget'],
      description: 'Leading Canadian fintech company focused on investment and banking services',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 85,
        culture: 90,
      },
    },
    {
      id: 53,
      name: 'Pinterest',
      logo: '/assets/img/companies/pinterest-logo.png',
      location: 'San Francisco, CA',
      industry: 'Social Media, Technology',
      size: '3,000+ employees',
      rating: 4.2,
      salaryRange: '$135K - $280K',
      benefits: ['Comprehensive Benefits', 'RSUs', 'Flexible Work', 'Wellness Programs'],
      description: 'Visual discovery platform helping people find lifestyle inspiration',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 85,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 54,
      name: 'Absolute Software',
      logo: '/assets/img/companies/absolute-logo.png',
      location: 'Vancouver, BC',
      industry: 'Cybersecurity',
      size: '1,000+ employees',
      rating: 4.0,
      salaryRange: 'CAD 80K - 170K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Provider of endpoint security and data risk management solutions',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 80,
        compensation: 80,
        culture: 85,
      },
    },
    {
      id: 55,
      name: 'Coinbase',
      logo: '/assets/img/companies/coinbase-logo.png',
      location: 'Remote-First',
      industry: 'Cryptocurrency, Financial Technology',
      size: '4,000+ employees',
      rating: 4.2,
      salaryRange: '$145K - $310K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote First', 'Crypto Benefits'],
      description: 'Leading cryptocurrency exchange platform and financial technology company',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 95,
        culture: 90,
      },
    },
    {
      id: 56,
      name: 'Nuvei',
      logo: '/assets/img/companies/nuvei-logo.png',
      location: 'Montreal, QC',
      industry: 'Payment Technology',
      size: '2,000+ employees',
      rating: 4.0,
      salaryRange: 'CAD 80K - 175K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Global payment technology provider for businesses',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 85,
        culture: 85,
      },
    },
    {
      id: 57,
      name: 'Dropbox',
      logo: '/assets/img/companies/dropbox-logo.png',
      location: 'San Francisco, CA',
      industry: 'Cloud Storage, Technology',
      size: '3,000+ employees',
      rating: 4.3,
      salaryRange: '$140K - $290K',
      benefits: ['Premium Benefits', 'RSUs', 'Virtual First', 'Learning Credits'],
      description: 'Leading provider of cloud storage and collaboration solutions',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 85,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 58,
      name: 'PointClickCare',
      logo: '/assets/img/companies/pointclickcare-logo.png',
      location: 'Mississauga, ON',
      industry: 'Healthcare Technology',
      size: '2,000+ employees',
      rating: 4.0,
      salaryRange: 'CAD 75K - 170K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Provider of cloud-based healthcare software solutions',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 80,
        compensation: 80,
        culture: 85,
      },
    },
    {
      id: 59,
      name: 'Asana',
      logo: '/assets/img/companies/asana-logo.png',
      location: 'San Francisco, CA',
      industry: 'Project Management Software',
      size: '1,500+ employees',
      rating: 4.3,
      salaryRange: '$135K - $280K',
      benefits: ['Comprehensive Benefits', 'RSUs', 'Remote Work', 'Wellness Programs'],
      description: 'Provider of work management platform for teams',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 85,
        compensation: 90,
        culture: 95,
      },
    },
    {
      id: 60,
      name: 'Thinkific',
      logo: '/assets/img/companies/thinkific-logo.png',
      location: 'Vancouver, BC',
      industry: 'Education Technology',
      size: '500+ employees',
      rating: 4.1,
      salaryRange: 'CAD 75K - 165K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Learning Budget'],
      description: 'Platform for creating and selling online courses',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 85,
        compensation: 80,
        culture: 90,
      },
    },
    {
      id: 61,
      name: 'Lyft',
      logo: '/companies/lyft-logo.png',
      location: 'San Francisco, CA',
      industry: 'Transportation Technology',
      size: '5,000+ employees',
      rating: 4.2,
      salaryRange: '$140K - $290K',
      benefits: ['Comprehensive Benefits', 'RSUs', 'Remote Work', 'Commuter Benefits'],
      description: 'Leading ridesharing and transportation technology company',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 62,
      name: 'Clio',
      logo: '/companies/clio-logo.png',
      location: 'Vancouver, BC',
      industry: 'Legal Technology',
      size: '1,000+ employees',
      rating: 4.2,
      salaryRange: 'CAD 85K - 180K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Learning Budget'],
      description: 'Leading provider of cloud-based legal practice management software',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 85,
        compensation: 85,
        culture: 95,
      },
    },
    {
      id: 63,
      name: 'DoorDash',
      logo: '/companies/doordash-logo.png',
      location: 'San Francisco, CA',
      industry: 'Food Delivery Technology',
      size: '8,000+ employees',
      rating: 4.1,
      salaryRange: '$135K - $280K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote Work', 'Food Credits'],
      description: 'Leading food delivery and logistics platform',
      culture: {
        workLifeBalance: 80,
        careerGrowth: 90,
        compensation: 90,
        culture: 85,
      },
    },
    {
      id: 64,
      name: 'Benevity',
      logo: '/companies/benevity-logo.png',
      location: 'Calgary, AB',
      industry: 'Corporate Social Responsibility',
      size: '1,000+ employees',
      rating: 4.1,
      salaryRange: 'CAD 80K - 175K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Volunteer Time'],
      description: 'Provider of corporate social responsibility and employee engagement software',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 85,
        compensation: 80,
        culture: 95,
      },
    },
    {
      id: 65,
      name: 'Instacart',
      logo: '/companies/instacart-logo.png',
      location: 'San Francisco, CA',
      industry: 'Grocery Technology',
      size: '10,000+ employees',
      rating: 4.0,
      salaryRange: '$130K - $270K',
      benefits: ['Comprehensive Benefits', 'RSUs', 'Remote Work', 'Grocery Credits'],
      description: 'Leading grocery delivery and pickup service platform',
      culture: {
        workLifeBalance: 80,
        careerGrowth: 85,
        compensation: 90,
        culture: 85,
      },
    },
    {
      id: 66,
      name: 'Verafin',
      logo: '/companies/verafin-logo.png',
      location: 'St. John\'s, NL',
      industry: 'Financial Crime Software',
      size: '1,000+ employees',
      rating: 4.2,
      salaryRange: 'CAD 75K - 170K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Provider of fraud detection and anti-money laundering software',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 85,
        compensation: 80,
        culture: 90,
      },
    },
    {
      id: 67,
      name: 'Affirm',
      logo: '/companies/affirm-logo.png',
      location: 'San Francisco, CA',
      industry: 'Financial Technology',
      size: '3,000+ employees',
      rating: 4.2,
      salaryRange: '$140K - $290K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote Work', 'Learning Credits'],
      description: 'Provider of innovative payment and lending solutions',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 68,
      name: 'Vendasta',
      logo: '/companies/vendasta-logo.png',
      location: 'Saskatoon, SK',
      industry: 'Digital Marketing Technology',
      size: '500+ employees',
      rating: 4.0,
      salaryRange: 'CAD 70K - 160K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Provider of digital solutions for marketing and business management',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 80,
        compensation: 75,
        culture: 90,
      },
    },
    {
      id: 69,
      name: 'Plaid',
      logo: '/companies/plaid-logo.png',
      location: 'San Francisco, CA',
      industry: 'Financial Technology',
      size: '1,500+ employees',
      rating: 4.3,
      salaryRange: '$145K - $300K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote Work', 'Learning Budget'],
      description: 'Provider of financial data connectivity solutions',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 95,
        culture: 90,
      },
    },
    {
      id: 70,
      name: 'Symend',
      logo: '/companies/symend-logo.png',
      location: 'Calgary, AB',
      industry: 'Customer Engagement Technology',
      size: '500+ employees',
      rating: 4.0,
      salaryRange: 'CAD 75K - 165K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Learning Credits'],
      description: 'Provider of digital engagement solutions for customer experience',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 80,
        culture: 90,
      },
    },
    {
      id: 71,
      name: 'Figma',
      logo: '/companies/figma-logo.png',
      location: 'San Francisco, CA',
      industry: 'Design Software',
      size: '1,000+ employees',
      rating: 4.4,
      salaryRange: '$140K - $290K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote Work', 'Learning Budget'],
      description: 'Leading collaborative interface design tool provider',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 90,
        compensation: 95,
        culture: 95,
      },
    },
    {
      id: 72,
      name: 'Copperleaf',
      logo: '/companies/copperleaf-logo.png',
      location: 'Vancouver, BC',
      industry: 'Decision Analytics Software',
      size: '500+ employees',
      rating: 4.1,
      salaryRange: 'CAD 80K - 175K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Provider of decision analytics solutions for infrastructure-intensive industries',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 80,
        culture: 90,
      },
    },
    {
      id: 73,
      name: 'HashiCorp',
      logo: '/companies/hashicorp-logo.png',
      location: 'San Francisco, CA',
      industry: 'Infrastructure Software',
      size: '2,000+ employees',
      rating: 4.3,
      salaryRange: '$140K - $300K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote First', 'Learning Credits'],
      description: 'Provider of cloud infrastructure automation software',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 90,
        compensation: 95,
        culture: 90,
      },
    },
    {
      id: 74,
      name: 'Dialogue',
      logo: '/companies/dialogue-logo.png',
      location: 'Montreal, QC',
      industry: 'Healthcare Technology',
      size: '1,000+ employees',
      rating: 4.0,
      salaryRange: 'CAD 75K - 170K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Wellness Programs'],
      description: 'Provider of virtual healthcare and wellness solutions',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 80,
        culture: 90,
      },
    },
    {
      id: 75,
      name: 'Notion',
      logo: '/companies/notion-logo.png',
      location: 'San Francisco, CA',
      industry: 'Productivity Software',
      size: '500+ employees',
      rating: 4.4,
      salaryRange: '$140K - $290K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote Work', 'Learning Budget'],
      description: 'Provider of all-in-one workspace for notes, docs, and collaboration',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 90,
        compensation: 95,
        culture: 95,
      },
    },
    {
      id: 76,
      name: 'Elastic',
      logo: '/companies/elastic-logo.png',
      location: 'Remote-First',
      industry: 'Enterprise Search, Observability',
      size: '3,000+ employees',
      rating: 4.2,
      salaryRange: '$135K - $280K',
      benefits: ['Comprehensive Benefits', 'RSUs', 'Remote First', 'Learning Credits'],
      description: 'Provider of search, observability, and security solutions',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 85,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 77,
      name: 'Thoughtworks',
      logo: '/companies/thoughtworks-logo.png',
      location: 'Chicago, IL',
      industry: 'Technology Consulting',
      size: '12,000+ employees',
      rating: 4.1,
      salaryRange: '$120K - $250K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Global technology consultancy focused on software development',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 85,
        culture: 90,
      },
    },
    {
      id: 78,
      name: 'Faire',
      logo: '/companies/faire-logo.png',
      location: 'Waterloo, ON',
      industry: 'Wholesale Marketplace',
      size: '1,000+ employees',
      rating: 4.2,
      salaryRange: 'CAD 85K - 180K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Learning Budget'],
      description: 'Online wholesale marketplace connecting retailers with makers',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 85,
        culture: 90,
      },
    },
    {
      id: 79,
      name: 'Confluent',
      logo: '/companies/confluent-logo.png',
      location: 'Mountain View, CA',
      industry: 'Data Infrastructure',
      size: '2,500+ employees',
      rating: 4.2,
      salaryRange: '$140K - $290K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote Work', 'Learning Credits'],
      description: 'Provider of real-time data infrastructure platform',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 85,
      },
    },
    {
      id: 80,
      name: 'Top Hat',
      logo: '/companies/tophat-logo.png',
      location: 'Toronto, ON',
      industry: 'Education Technology',
      size: '500+ employees',
      rating: 4.0,
      salaryRange: 'CAD 75K - 165K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Provider of student engagement platform for higher education',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 80,
        culture: 90,
      },
    },
    {
      id: 81,
      name: 'Hubspot',
      logo: '/companies/hubspot-logo.png',
      location: 'Cambridge, MA',
      industry: 'Marketing Software',
      size: '7,000+ employees',
      rating: 4.4,
      salaryRange: '$130K - $280K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote Work', 'Learning Credits'],
      description: 'Provider of inbound marketing and sales software solutions',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 90,
        compensation: 90,
        culture: 95,
      },
    },
    {
      id: 82,
      name: 'Alida',
      logo: '/companies/alida-logo.png',
      location: 'Toronto, ON',
      industry: 'Customer Experience Software',
      size: '500+ employees',
      rating: 4.0,
      salaryRange: 'CAD 75K - 165K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Provider of customer experience management and insights platform',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 80,
        culture: 90,
      },
    },
    {
      id: 83,
      name: 'Crowdstrike',
      logo: '/companies/crowdstrike-logo.png',
      location: 'Austin, TX',
      industry: 'Cybersecurity',
      size: '7,000+ employees',
      rating: 4.3,
      salaryRange: '$140K - $290K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote Work', 'Learning Budget'],
      description: 'Leading provider of cloud-native endpoint security solutions',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 95,
        culture: 90,
      },
    },
    {
      id: 84,
      name: 'Trulioo',
      logo: '/companies/trulioo-logo.png',
      location: 'Vancouver, BC',
      industry: 'Identity Verification',
      size: '500+ employees',
      rating: 4.1,
      salaryRange: 'CAD 80K - 175K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Provider of global identity verification solutions',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 85,
        culture: 90,
      },
    },
    {
      id: 85,
      name: 'Databricks',
      logo: '/companies/databricks-logo.png',
      location: 'San Francisco, CA',
      industry: 'Data Analytics, AI',
      size: '5,000+ employees',
      rating: 4.4,
      salaryRange: '$150K - $320K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote Work', 'Learning Credits'],
      description: 'Provider of unified analytics platform for big data and machine learning',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 95,
        compensation: 95,
        culture: 90,
      },
    },
    {
      id: 86,
      name: 'Clearco',
      logo: '/companies/clearco-logo.png',
      location: 'Toronto, ON',
      industry: 'Financial Technology',
      size: '500+ employees',
      rating: 4.0,
      salaryRange: 'CAD 80K - 170K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Provider of revenue-based financing for e-commerce businesses',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 85,
        culture: 90,
      },
    },
    {
      id: 87,
      name: 'UiPath',
      logo: '/companies/uipath-logo.png',
      location: 'New York, NY',
      industry: 'Robotic Process Automation',
      size: '4,000+ employees',
      rating: 4.2,
      salaryRange: '$135K - $280K',
      benefits: ['Comprehensive Benefits', 'RSUs', 'Remote Work', 'Learning Budget'],
      description: 'Leading provider of enterprise automation software',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 88,
      name: 'Visier',
      logo: '/companies/visier-logo.png',
      location: 'Vancouver, BC',
      industry: 'People Analytics',
      size: '1,000+ employees',
      rating: 4.1,
      salaryRange: 'CAD 80K - 175K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Provider of people analytics and workforce planning solutions',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 85,
        culture: 90,
      },
    },
    {
      id: 89,
      name: 'GitLab',
      logo: '/companies/gitlab-logo.png',
      location: 'Remote-First',
      industry: 'DevOps Platform',
      size: '2,000+ employees',
      rating: 4.4,
      salaryRange: '$140K - $290K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote First', 'Learning Credits'],
      description: 'Provider of complete DevOps platform delivered as a single application',
      culture: {
        workLifeBalance: 95,
        careerGrowth: 90,
        compensation: 90,
        culture: 95,
      },
    },
    {
      id: 90,
      name: 'Ada',
      logo: '/companies/ada-logo.png',
      location: 'Toronto, ON',
      industry: 'AI Customer Service',
      size: '500+ employees',
      rating: 4.2,
      salaryRange: 'CAD 85K - 180K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Learning Budget'],
      description: 'Provider of AI-powered customer service automation platform',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 85,
        culture: 90,
      },
    },
    {
      id: 91,
      name: 'Akamai',
      logo: '/companies/akamai-logo.png',
      location: 'Cambridge, MA',
      industry: 'Content Delivery, Cybersecurity',
      size: '8,000+ employees',
      rating: 4.1,
      salaryRange: '$130K - $270K',
      benefits: ['Comprehensive Benefits', 'RSUs', 'Remote Work', 'Learning Credits'],
      description: 'Leading provider of content delivery network and cloud security services',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 90,
        culture: 85,
      },
    },
    {
      id: 92,
      name: 'Tucows',
      logo: '/companies/tucows-logo.png',
      location: 'Toronto, ON',
      industry: 'Internet Services',
      size: '1,000+ employees',
      rating: 4.0,
      salaryRange: 'CAD 80K - 170K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Provider of internet services and domain registration solutions',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 80,
        compensation: 80,
        culture: 85,
      },
    },
    {
      id: 93,
      name: 'New Relic',
      logo: '/companies/newrelic-logo.png',
      location: 'San Francisco, CA',
      industry: 'Observability Platform',
      size: '2,000+ employees',
      rating: 4.2,
      salaryRange: '$135K - $280K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote Work', 'Learning Budget'],
      description: 'Provider of observability platform for software development',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 94,
      name: 'Thinkific Labs',
      logo: '/companies/thinkificlabs-logo.png',
      location: 'Vancouver, BC',
      industry: 'Education Technology',
      size: '500+ employees',
      rating: 4.1,
      salaryRange: 'CAD 75K - 165K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Learning Budget'],
      description: 'Provider of online course creation and delivery platform',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 85,
        compensation: 80,
        culture: 90,
      },
    },
    {
      id: 95,
      name: 'Fastly',
      logo: '/companies/fastly-logo.png',
      location: 'San Francisco, CA',
      industry: 'Edge Computing, CDN',
      size: '1,000+ employees',
      rating: 4.2,
      salaryRange: '$135K - $280K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote Work', 'Learning Credits'],
      description: 'Provider of edge cloud platform and content delivery services',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 96,
      name: 'Shopify Plus',
      logo: '/companies/shopifyplus-logo.png',
      location: 'Waterloo, ON',
      industry: 'E-commerce, Enterprise Software',
      size: '2,000+ employees',
      rating: 4.3,
      salaryRange: 'CAD 90K - 200K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Learning Budget'],
      description: 'Enterprise e-commerce platform for high-volume merchants',
      culture: {
        workLifeBalance: 90,
        careerGrowth: 90,
        compensation: 90,
        culture: 95,
      },
    },
    {
      id: 97,
      name: 'Sumo Logic',
      logo: '/companies/sumologic-logo.png',
      location: 'Redwood City, CA',
      industry: 'Cloud Analytics',
      size: '2,000+ employees',
      rating: 4.1,
      salaryRange: '$130K - $270K',
      benefits: ['Comprehensive Benefits', 'RSUs', 'Remote Work', 'Learning Credits'],
      description: 'Provider of cloud-native machine data analytics platform',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 90,
        culture: 85,
      },
    },
    {
      id: 98,
      name: 'Wave Financial',
      logo: '/companies/wave-logo.png',
      location: 'Toronto, ON',
      industry: 'Financial Technology',
      size: '500+ employees',
      rating: 4.1,
      salaryRange: 'CAD 80K - 175K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Professional Development'],
      description: 'Provider of financial software for small businesses',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 80,
        culture: 90,
      },
    },
    {
      id: 99,
      name: 'PagerDuty',
      logo: '/companies/pagerduty-logo.png',
      location: 'San Francisco, CA',
      industry: 'Digital Operations Management',
      size: '1,000+ employees',
      rating: 4.2,
      salaryRange: '$135K - $280K',
      benefits: ['Premium Benefits', 'RSUs', 'Remote Work', 'Learning Credits'],
      description: 'Provider of digital operations management platform',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 90,
        compensation: 90,
        culture: 90,
      },
    },
    {
      id: 100,
      name: 'Wattpad',
      logo: '/companies/wattpad-logo.png',
      location: 'Toronto, ON',
      industry: 'Digital Entertainment',
      size: '500+ employees',
      rating: 4.0,
      salaryRange: 'CAD 75K - 165K',
      benefits: ['Health Benefits', 'Stock Options', 'Remote Work', 'Learning Budget'],
      description: 'Global entertainment company and social storytelling platform',
      culture: {
        workLifeBalance: 85,
        careerGrowth: 85,
        compensation: 80,
        culture: 90,
      },
    }
  ];

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            기업 정보
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            주요 IT 기업의 상세 정보와 근무 환경을 확인하세요
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 2,
            border: 1,
            borderColor: 'divider',
          }}
        >
          <TextField
            fullWidth
            placeholder="기업명, 지역, 산업군으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ bgcolor: 'background.paper' }}
          />
        </Paper>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {filteredCompanies.map((company) => (
              <Grid item xs={12} key={company.id}>
                <motion.div variants={itemVariants}>
                  <Card
                    elevation={0}
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: '100%', md: 200 },
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRight: { md: 1 },
                        borderBottom: { xs: 1, md: 0 },
                        borderColor: 'divider',
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={company.logo}
                        alt={company.name}
                        sx={{
                          width: 120,
                          height: 120,
                          objectFit: 'contain',
                          mb: 2,
                        }}
                      />
                      <Rating value={company.rating} precision={0.1} readOnly />
                      <Typography variant="body2" color="text.secondary">
                        {company.rating} / 5.0
                      </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={8}>
                            <Stack spacing={2}>
                              <Box>
                                <Typography variant="h6" gutterBottom>
                                  {company.name}
                                </Typography>
                                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                  <Chip
                                    icon={<LocationOn />}
                                    label={company.location}
                                    size="small"
                                  />
                                  <Chip
                                    icon={<Business />}
                                    label={company.industry}
                                    size="small"
                                  />
                                  <Chip
                                    icon={<People />}
                                    label={company.size}
                                    size="small"
                                  />
                                </Stack>
                                <Typography variant="body2" paragraph>
                                  {company.description}
                                </Typography>
                              </Box>

                              <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                  주요 복리후생
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                  {company.benefits.map((benefit, idx) => (
                                    <Chip
                                      key={idx}
                                      icon={<Star fontSize="small" />}
                                      label={benefit}
                                      size="small"
                                      variant="outlined"
                                      sx={{ mt: 1 }}
                                    />
                                  ))}
                                </Stack>
                              </Box>
                            </Stack>
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <Stack spacing={2}>
                              <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                  연봉 범위
                                </Typography>
                                <Typography variant="h6" color="primary">
                                  {company.salaryRange}
                                </Typography>
                              </Box>

                              <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                  기업 문화
                                </Typography>
                                <Stack spacing={1.5}>
                                  <Box>
                                    <Typography variant="body2" gutterBottom>
                                      워라밸
                                    </Typography>
                                    <LinearProgress
                                      variant="determinate"
                                      value={company.culture.workLifeBalance}
                                      sx={{ height: 6, borderRadius: 3 }}
                                    />
                                  </Box>
                                  <Box>
                                    <Typography variant="body2" gutterBottom>
                                      성장 기회
                                    </Typography>
                                    <LinearProgress
                                      variant="determinate"
                                      value={company.culture.careerGrowth}
                                      sx={{ height: 6, borderRadius: 3 }}
                                    />
                                  </Box>
                                  <Box>
                                    <Typography variant="body2" gutterBottom>
                                      보상 수준
                                    </Typography>
                                    <LinearProgress
                                      variant="determinate"
                                      value={company.culture.compensation}
                                      sx={{ height: 6, borderRadius: 3 }}
                                    />
                                  </Box>
                                  <Box>
                                    <Typography variant="body2" gutterBottom>
                                      기업 문화
                                    </Typography>
                                    <LinearProgress
                                      variant="determinate"
                                      value={company.culture.culture}
                                      sx={{ height: 6, borderRadius: 3 }}
                                    />
                                  </Box>
                                </Stack>
                              </Box>
                            </Stack>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.default',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Info color="info" />
            <Typography variant="body2" color="text.secondary">
              기업 정보는 정기적으로 업데이트되며, 실제 데이터와 차이가 있을 수 있습니다.
              더 자세한 정보는 각 기업의 공식 채용 페이지를 참고해주세요.
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
