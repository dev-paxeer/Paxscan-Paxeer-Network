import { Box, Text, Icon } from '@chakra-ui/react';
import React from 'react';

// This icon doesn't work properly when it is in the sprite
// Probably because of the gradient
// eslint-disable-next-line no-restricted-imports
// Temporary fix for SVG import issue
const solidityScanIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);
import useFetchReport from 'lib/solidityScan/useFetchReport';
import { Link } from 'toolkit/chakra/link';
import { PopoverBody, PopoverContent, PopoverRoot } from 'toolkit/chakra/popover';
import SolidityscanReportButton from 'ui/shared/solidityscanReport/SolidityscanReportButton';
import SolidityscanReportDetails from 'ui/shared/solidityscanReport/SolidityscanReportDetails';
import SolidityscanReportScore from 'ui/shared/solidityscanReport/SolidityscanReportScore';

interface Props {
  hash: string;
}

const SolidityscanReport = ({ hash }: Props) => {

  const { data, isPlaceholderData, isError } = useFetchReport({ hash });

  if (isError || !data) {
    return null;
  }

  const score = Number(data.scan_report.scan_summary.score_v2);

  if (!score) {
    return null;
  }

  const vulnerabilities = data.scan_report.scan_summary.issue_severity_distribution;
  const vulnerabilitiesCounts = vulnerabilities ? Object.values(vulnerabilities) : [];
  const vulnerabilitiesCount = vulnerabilitiesCounts.reduce((acc, val) => acc + val, 0);

  return (
    <PopoverRoot>
      <SolidityscanReportButton
        score={ score }
        isLoading={ isPlaceholderData }
      />
      <PopoverContent w={{ base: '100vw', lg: '328px' }}>
        <PopoverBody textStyle="sm">
          <Box mb={ 5 } lineHeight="25px">
            Contract analyzed for 240+ vulnerability patterns by
            <Icon as={ solidityScanIcon } mr={ 1 } ml="6px" w="23px" h="20px" display="inline-block" verticalAlign="middle"/>
            <Text fontWeight={ 600 } display="inline-block">SolidityScan</Text>
          </Box>
          <SolidityscanReportScore score={ score } mb={ 5 }/>
          { vulnerabilities && vulnerabilitiesCount > 0 && (
            <Box mb={ 5 }>
              <Text py="7px" color="text.secondary" textStyle="xs" fontWeight={ 500 }>Vulnerabilities distribution</Text>
              <SolidityscanReportDetails vulnerabilities={ vulnerabilities } vulnerabilitiesCount={ vulnerabilitiesCount }/>
            </Box>
          ) }
          <Link href={ data.scan_report.scanner_reference_url } external>View full report</Link>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default React.memo(SolidityscanReport);
