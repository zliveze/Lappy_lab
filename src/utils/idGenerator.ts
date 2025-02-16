import Swal from 'sweetalert2';

export const generateHexString = (length: number): string => {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const generateUUID = (): string => {
  return '{xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx}'.replace(/[xy]/g, function(c) {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16).toUpperCase();
  });
};

export const generateDeviceUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16).toLowerCase();
  });
};

export const generateMachineId = (): string => {
  return generateHexString(32);
};

export const copyToClipboard = async (text: string) => {
  if (text === "Nhấn \"Tạo ID Mới\" để tạo ID") {
    await Swal.fire({
      icon: 'warning',
      title: 'Vui lòng tạo ID mới trước!',
      showConfirmButton: false,
      timer: 1500,
      position: 'top-end',
      toast: true
    });
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    await Swal.fire({
      icon: 'success',
      title: 'Đã sao chép ID!',
      showConfirmButton: false,
      timer: 1500,
      position: 'top-end',
      toast: true
    });
  } catch (_err) {
    await Swal.fire({
      icon: 'error',
      title: 'Không thể sao chép ID',
      showConfirmButton: false,
      timer: 1500,
      position: 'top-end',
      toast: true
    });
  }
};

export const generateIds = async () => {
  const macId = generateMachineId();
  const sqm = generateUUID();
  const machId = generateMachineId();
  const devId = generateDeviceUUID();

  return {
    macMachineId: macId,
    sqmId: sqm,
    machineId: machId,
    devDeviceId: devId
  };
}; 