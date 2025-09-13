import type { MultichainConfig } from 'types/multichain';

let value: MultichainConfig | undefined = undefined;

function readFileConfig() {
  // eslint-disable-next-line no-restricted-properties
  if (process.env.NEXT_RUNTIME !== 'nodejs') {
    // Return empty config for client-side - multichain disabled for Paxeer Network
    return undefined;
  }

  try {
    // Multichain disabled for single Paxeer Network deployment
    return undefined;
  } catch (error) {
    return;
  }
}

export async function load() {
  if (!value) {
    return new Promise<MultichainConfig | undefined>((resolve) => {
      const value = readFileConfig();
      resolve(value);
    });
  }

  return Promise.resolve(value);
}

export function getValue() {
  if (!value) {
    return readFileConfig();
  }

  return value;
}
