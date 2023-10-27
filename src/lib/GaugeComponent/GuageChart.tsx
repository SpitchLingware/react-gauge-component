import { FC } from 'react';
import { GaugeComponent } from './index';
import React from 'react';
import { SubArc } from './types/Arc';

export type QualityInitiativesRangesType = 'good' | 'bad' | 'attention';

export type QualityInitiativesMetricType = 'doc_count' | 'doc_percent' | 'sum' | 'avg' | 'max' | 'min' | 'cardinality';

export type QualityInitiativesRangesStyle = {
    color: string;
};

export type QualityInitiativesRanges = {
    end: number;
    type: QualityInitiativesRangesType;
    description: string;
    style: QualityInitiativesRangesStyle;
    title: string;
};

const ranges: Array<QualityInitiativesRanges> = [
    {
        end: 30,
        type: 'good',
        title: 'Good mark',
        description: 'Some description',
        style: {
            color: '#5BE12C',
        },
    },
    {
        end: 70,
        type: 'attention',
        title: 'Attention mark',
        description: 'Some description',
        style: {
            color: '#F5CD19',
        },
    },
    {
        end: 100,
        type: 'bad',
        title: 'Bad mark',
        description: 'Some description',
        style: {
            color: '#EA4228',
        },
    },
];

const value = 20;

const createArc = (e: QualityInitiativesRanges, override: Partial<QualityInitiativesRanges>) => {
    const all = { ...e, ...override };
    return {
        limit: all.end,
        color: all.style.color,
        showTick: true,
        tooltip: {
            text: all.title,
        },
    };
};

const TopPanel: FC<{
    title: string;
    color: string;
    description: string;
}> = ({ title, color, description }) => {
    return (
        <div style={{ textAlign: 'left', padding: 5, margin: 1, display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8em', flex: 2, display: 'flex', marginLeft: '5px' }}>
                <span>{title}</span>
                <svg style={{ marginLeft: '1em', alignSelf: 'center' }} height={10} width={20}>
                    <circle cx='5' cy='5' r='5' stroke-width='0' fill={color} />
                </svg>
            </span>
            <span style={{ flex: 1 }}>&nbsp;</span>
            <span style={{ fontSize: '0.8em', flex: 2 }}>{description}</span>
        </div>
    );
};

export const GuageChart: FC = () => {
    const subArcs: Array<SubArc> = ranges.map((e, i) => {
        return createArc(e, {});
    });
    const maxValue = Math.max(...ranges.map((e) => e.end), value);
    if (maxValue > ranges[ranges.length - 1].end) {
        subArcs.push(createArc(ranges[ranges.length - 1], { end: maxValue }));
    }
    return (
        <div
            style={{
                position: 'relative',
                border: '1.5px solid',
                borderRadius: '25px',
                margin: '5px',
            }}>
            <TopPanel title='Some important text' color='red' description='Some description' />
            <GaugeComponent
                style={{ padding: 0 }}
                marginInPercent={{
                    top: 0.06,
                    bottom: 0.06,
                    left: 0.1,
                    right: 0.1,
                }}
                arc={{
                    cornerRadius: 7,
                    width: 0.2,
                    subArcs: subArcs,
                }}
                labels={{
                    valueLabel: { formatTextValue: (value) => value + '%', matchColorWithArc: true },
                    tickLabels: {
                        defaultTickValueConfig: {
                            formatTextValue: (value) => value + '%',
                            style: { fontSize: '10px' },
                        },
                        ticks: [],
                    },
                }}
                value={value}
                minValue={0}
                maxValue={maxValue}
            />
            <div style={{ position: 'absolute', bottom: +10, width: '100%' }}>
                <button
                    style={{
                        backgroundColor: 'lightgray',
                        border: 'none',
                        color: 'black',
                        padding: '5px 20px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '12px',
                        borderRadius: 5,
                    }}>
                    Как понизить
                </button>
            </div>
        </div>
    );
};
