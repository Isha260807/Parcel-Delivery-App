const map = {
  pending: 'status-chip status-chip--pending',
  driver_assigned: 'status-chip status-chip--assigned',
  arriving: 'status-chip status-chip--arriving',
  picked_up: 'status-chip status-chip--progress',
  in_transit: 'status-chip status-chip--progress',
  completed: 'status-chip status-chip--done',
  cancelled: 'status-chip status-chip--cancelled',
};

const labels = {
  pending: 'Pending',
  driver_assigned: 'Driver Assigned',
  arriving: 'Driver Arriving',
  picked_up: 'Picked Up',
  in_transit: 'In Transit',
  completed: 'Delivered',
  cancelled: 'Cancelled',
};

export default function StatusChip({ status }) {
  return <span className={map[status] || 'status-chip'}>{labels[status] || status}</span>;
}
