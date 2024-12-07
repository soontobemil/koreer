import React from 'react';
import { motion } from 'framer-motion';
import style from '../../../assets/scss/shared/sharedComponents.module.scss';

interface InfoCardProps {
    icon?: string;
    title: string;
    description?: string;
    stats?: Array<{
        label: string;
        value: string;
    }>;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    variant?: 'default' | 'highlight' | 'outline';
    action?: {
        label: string;
        onClick: () => void;
    };
}

export const InfoCard: React.FC<InfoCardProps> = ({
    icon,
    title,
    description,
    stats,
    onClick,
    className,
    children,
    variant = 'default',
    action
}) => {
    return (
        <motion.div
            className={`${style.infoCard} ${style[variant]} ${className || ''}`}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className={style.cardHeader}>
                {icon && <span className={style.cardIcon}>{icon}</span>}
                <h3>{title}</h3>
            </div>

            {description && (
                <p className={style.cardDescription}>{description}</p>
            )}

            {stats && stats.length > 0 && (
                <div className={style.statsGrid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={style.statItem}>
                            <span className={style.statValue}>{stat.value}</span>
                            <span className={style.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            )}

            {children && (
                <div className={style.cardContent}>
                    {children}
                </div>
            )}

            {action && (
                <button 
                    className={style.cardAction}
                    onClick={(e) => {
                        e.stopPropagation();
                        action.onClick();
                    }}
                >
                    {action.label}
                </button>
            )}
        </motion.div>
    );
};
