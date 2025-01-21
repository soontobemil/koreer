import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  School,
  Work,
  Psychology,
  Code,
  Build,
  TrendingUp,
  Person,
  DataObject,
  Storage as StorageIcon,
  Architecture,
  Speed,
  Group as GroupIcon,
  Lightbulb,
  CheckCircle,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { PageLayout } from '../../components/shared/layouts/PageLayout';
import { InfoCard } from '../../components/shared/InfoCard';

// ... rest of the code from koreer-fe/src/features/employment/InterviewGuide.tsx ... 