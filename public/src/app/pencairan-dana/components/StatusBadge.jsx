const StatusBadge = ({ status, type }) => {
  switch (type) {
    case "warning":
      return (
        <span className="inline-block rounded-full border border-amber-300 bg-amber-50 px-3 py-0.5 text-xs font-semibold text-amber-600">
          {status}
        </span>
      );

    case "danger":
      return (
        <span className="inline-block rounded-full border border-rose-300 bg-rose-50 px-3 py-0.5 text-xs font-semibold text-rose-500">
          {status}
        </span>
      );

    case "success":
      return (
        <span className="inline-block rounded-full border border-emerald-300 bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-600">
          {status}
        </span>
      );

    default:
      return (
        <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-0.5 text-xs font-semibold text-slate-600">
          {status}
        </span>
      );
  }
};

export default StatusBadge;