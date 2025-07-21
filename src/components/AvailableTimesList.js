import { Clock, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { useTranslations } from "next-intl";

const AvailableTimesList = ({
  availableTimes,
  loading,
  error,
  selectedDate,
  onSelectTimeSlot,
}) => {
  const t = useTranslations();
  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBookTime = (schedulingUrl) => {
    window.open(schedulingUrl, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-muted-foreground">
            {t("book.loading")}
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <div className="text-center">
          <div className="text-destructive mb-2">
            Error loading available times
          </div>
          <div className="text-sm text-muted-foreground">{error}</div>
        </div>
      </div>
    );
  }

  if (!selectedDate) {
    return (
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <div className="text-center text-muted-foreground">
          <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Please select a date to view available times</p>
        </div>
      </div>
    );
  }

  if (!availableTimes || availableTimes.length === 0) {
    return (
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <div className="text-center">
          <Clock className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium mb-2">No available times</h3>
          <p className="text-muted-foreground">
            No available appointment slots for{" "}
            {formatDate(selectedDate.toISOString())}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-lg p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5" />
          {t("book.availableTimes")}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {formatDate(selectedDate.toISOString())}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {availableTimes.map((timeSlot, index) => (
          <button
            key={index}
            onClick={() => {
              onSelectTimeSlot && onSelectTimeSlot(timeSlot);
            }}
            title="احجز هذا الوقت"
            className={`w-20 h-20 flex flex-col items-center justify-center rounded-full border text-base font-semibold transition-all duration-200 shadow-md
              bg-white
              border-gray-200
              hover:border-primary hover:bg-gradient-to-br hover:from-primary/10 hover:to-white hover:shadow-xl hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
              active:scale-95
              ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            `}
            style={{ minWidth: 80, minHeight: 80 }}
          >
            <span className="text-sm mb-1">
              {formatTime(timeSlot.start_time)}
            </span>
            {timeSlot.invitees_remaining && (
              <span className="mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
                <Users className="h-3 w-3 mr-1 inline" />
                {timeSlot.invitees_remaining}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>{t("book.note")}</strong> {t("book.calendlyNote")}
        </p>
      </div>
    </div>
  );
};

export default AvailableTimesList;
