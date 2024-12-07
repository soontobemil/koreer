import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Chip,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

interface InfoCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  status?: 'success' | 'warning' | 'info';
  expandable?: boolean;
  children: React.ReactNode;
  action?: React.ReactNode;
  chips?: Array<{
    label: string;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  }>;
  bulletPoints?: Array<{
    text: string;
    icon?: React.ReactNode;
    color?: string;
  }>;
}

export function InfoCard({
  title,
  subtitle,
  icon,
  status = 'info',
  expandable = false,
  children,
  action,
  chips,
  bulletPoints,
}: InfoCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();

  const statusColors = {
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
  };

  const StatusIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    info: InfoIcon,
  }[status];

  return (
    <Card
      elevation={2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
        '&::before': expandable ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 4,
          height: '100%',
          backgroundColor: statusColors[status],
          borderRadius: '4px 0 0 4px',
        } : undefined,
      }}
    >
      <CardHeader
        avatar={icon}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {action}
            {expandable && (
              <IconButton
                onClick={() => setExpanded(!expanded)}
                sx={{
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                }}
              >
                <ExpandMoreIcon />
              </IconButton>
            )}
          </Box>
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StatusIcon
              sx={{
                color: statusColors[status],
                fontSize: 20,
              }}
            />
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          </Box>
        }
        subheader={subtitle}
        sx={{
          pb: chips ? 0 : undefined,
        }}
      />

      {chips && (
        <Box sx={{ px: 2, pb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {chips.map((chip, index) => (
            <Chip
              key={index}
              label={chip.label}
              color={chip.color || 'default'}
              size="small"
              sx={{
                fontWeight: 500,
              }}
            />
          ))}
        </Box>
      )}

      <CardContent sx={{ flex: 1, pt: chips ? 0 : undefined }}>
        {bulletPoints ? (
          <List disablePadding>
            {bulletPoints.map((point, index) => (
              <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {point.icon || <CheckCircleIcon sx={{ color: point.color || theme.palette.success.main }} />}
                </ListItemIcon>
                <ListItemText
                  primary={point.text}
                  primaryTypographyProps={{
                    variant: 'body2',
                    color: 'text.primary',
                  }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          children
        )}
      </CardContent>

      {expandable && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ pt: 0 }}>
            {children}
          </CardContent>
        </Collapse>
      )}
    </Card>
  );
}
