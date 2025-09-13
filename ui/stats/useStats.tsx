import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';

import type * as stats from '@blockscout/stats-types';
import type { StatsIntervalIds } from 'types/client/stats';

import useApiQuery from 'lib/api/useApiQuery';
import getQueryParamString from 'lib/router/getQueryParamString';
import { STATS_CHARTS } from 'stubs/stats';

function isSectionMatches(section: stats.LineChartSection, currentSection: string): boolean {
  return currentSection === 'all' || section.id === currentSection;
}

function isChartNameMatches(q: string, chart: stats.LineChartInfo) {
  return chart.title.toLowerCase().includes(q.toLowerCase());
}

export default function useStats() {
  const router = useRouter();

  const { data: rawData, isPlaceholderData, isError } = useApiQuery('stats:lines', {
    queryOptions: {
      placeholderData: STATS_CHARTS,
    },
  });

  // Temporary data transformer: Convert v2 API data to expected frontend format
  const data = useMemo(() => {
    if (!rawData || (rawData as any).sections) return rawData; // Already in correct format or null
    
    // Cast rawData to any to access v2 API properties
    const v2Data = rawData as any;
    
    // Transform v2 stats data into expected sections/charts structure
    return {
      sections: [
        {
          id: 'transactions',
          title: 'Transactions',
          charts: [
            {
              id: 'newTxns',
              title: 'New transactions',
              description: 'Daily transaction count for Paxeer Network',
              units: undefined,
              resolutions: ['DAY', 'MONTH'],
            },
            {
              id: 'totalTxns',
              title: 'Total transactions',
              description: `Total transactions: ${v2Data.total_transactions || 'N/A'}`,
              units: undefined,
              resolutions: ['DAY', 'MONTH'],
            }
          ],
        },
        {
          id: 'accounts',
          title: 'Accounts',
          charts: [
            {
              id: 'totalAccounts',
              title: 'Total accounts',
              description: `Total addresses: ${v2Data.total_addresses || 'N/A'}`,
              units: undefined,
              resolutions: ['DAY', 'MONTH'],
            }
          ],
        },
        {
          id: 'blocks',
          title: 'Blocks',
          charts: [
            {
              id: 'totalBlocks',
              title: 'Total blocks',
              description: `Total blocks: ${v2Data.total_blocks || 'N/A'}`,
              units: undefined,
              resolutions: ['DAY', 'MONTH'],
            }
          ],
        }
      ]
    };
  }, [rawData]);

  const [ currentSection, setCurrentSection ] = useState('all');
  const [ filterQuery, setFilterQuery ] = useState('');
  const [ initialFilterQuery, setInitialFilterQuery ] = React.useState('');
  const [ interval, setInterval ] = useState<StatsIntervalIds>('oneMonth');
  const sectionIds = useMemo(() => data?.sections?.map(({ id }) => id), [ data ]);

  React.useEffect(() => {
    if (!isPlaceholderData && !isError) {
      const chartId = getQueryParamString(router.query.chartId);
      const chartName = data?.sections.map((section) => section.charts.find((chart) => chart.id === chartId)).filter(Boolean)[0]?.title;
      if (chartName) {
        setInitialFilterQuery(chartName);
        setFilterQuery(chartName);
        router.replace({ pathname: '/stats' }, undefined, { scroll: false });
      }
    }
  // run only when data is loaded
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isPlaceholderData ]);

  const displayedCharts = React.useMemo(() => {
    return data?.sections
      ?.map((section) => {
        const charts = section.charts.filter((chart) => isSectionMatches(section, currentSection) && isChartNameMatches(filterQuery, chart));

        return {
          ...section,
          charts,
        };
      }).filter((section) => section.charts.length > 0);
  }, [ currentSection, data?.sections, filterQuery ]);

  const handleSectionChange = useCallback((newSection: string) => {
    setCurrentSection(newSection);
  }, []);

  const handleIntervalChange = useCallback((newInterval: StatsIntervalIds) => {
    setInterval(newInterval);
  }, []);

  const handleFilterChange = useCallback((q: string) => {
    setFilterQuery(q);
  }, []);

  return React.useMemo(() => ({
    sections: data?.sections,
    sectionIds,
    isPlaceholderData,
    isError,
    initialFilterQuery,
    filterQuery,
    currentSection,
    handleSectionChange,
    interval,
    handleIntervalChange,
    handleFilterChange,
    displayedCharts,
  }), [
    data,
    sectionIds,
    isPlaceholderData,
    isError,
    initialFilterQuery,
    filterQuery,
    currentSection,
    handleSectionChange,
    interval,
    handleIntervalChange,
    handleFilterChange,
    displayedCharts,
  ]);
}
