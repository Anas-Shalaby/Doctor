"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { supabase } from "@/utils/supabaseClient";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getEventTypes,
  getAvailableTimes,
  getDayRange,
  saveAppointmentToSupabase,
} from "@/services/calendlyServices";
import DatePicker from "@/components/DatePicker";
import AvailableTimesList from "@/components/AvailableTimesList";

export default function BookAppointment() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service");
  const [step, setStep] = useState(preselectedService ? 2 : 1);
  const [selectedService, setSelectedService] = useState(
    preselectedService || ""
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const accessToken = process.env.NEXT_PUBLIC_CALENDLY_API_KEY;
  const userUri =
    "https://api.calendly.com/users/3f7facaf-be3c-4cdd-a2d7-f41b218b00ba";
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedEventType, setSelectedEventType] = useState(
    "https://api.calendly.com/event_types/da129733-fe84-4fa8-9541-57f03a4d0765"
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    dob: "",
    reason: "",
  });
  const [zoomLink, setZoomLink] = useState("");
  // 1. أضف state جديد لحفظ التاريخ والوقت معًا
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
    setShowUserForm(true);
  };

  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserFormSubmit = (e) => {
    e.preventDefault();
    // تحقق من الحقول المطلوبة
    if (
      !userFormData.firstName ||
      !userFormData.lastName ||
      !userFormData.phone ||
      !userFormData.nationality ||
      !userFormData.dob
    ) {
      toast.error(t("book.requiredFieldsError"));
      return;
    }
    if (selectedTimeSlot) {
      window.open(
        selectedTimeSlot.scheduling_url,
        "_blank",
        "noopener,noreferrer"
      );
    }
    setShowUserForm(false);
    setSelectedTimeSlot(null);
    setUserFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      nationality: "",
      dob: "",
      reason: "",
    });
  };

  const services = [
    {
      id: "cbt",
      name: t("book.services.cbt.name"),
      duration: t("book.services.cbt.duration"),
      price: t("book.services.cbt.price"),
    },
    {
      id: "stress",
      name: t("book.services.stress.name"),
      duration: t("book.services.stress.duration"),
      price: t("book.services.stress.price"),
    },
    {
      id: "couples",
      name: t("book.services.couples.name"),
      duration: t("book.services.couples.duration"),
      price: t("book.services.couples.price"),
    },
    {
      id: "online",
      name: t("book.services.online.name"),
      duration: t("book.services.online.duration"),
      price: t("book.services.online.price"),
    },
    {
      id: "group",
      name: t("book.services.group.name"),
      duration: t("book.services.group.duration"),
      price: t("book.services.group.price"),
    },
    {
      id: "crisis",
      name: t("book.services.crisis.name"),
      duration: t("book.services.crisis.duration"),
      price: t("book.services.crisis.price"),
    },
  ];

  const steps = [
    t("book.steps.0"),
    t("book.steps.2"),
    t("book.steps.1"),
    t("book.steps.3"),
  ];
  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function fetchScheduledEvents(userUri, accessToken) {
    const response = await fetch(
      `https://api.calendly.com/scheduled_events?user=${encodeURIComponent(
        userUri
      )}&status=active`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch scheduled events");
    return await response.json();
  }
  useEffect(() => {
    async function fetchEventTypes() {
      try {
        const data = await getEventTypes(userUri, accessToken);
        setEventTypes(data.collection.filter((e) => e.active));
      } catch (err) {
        console.error("Error fetching event types", err);
      }
    }
    fetchEventTypes();
  }, []);

  const loadAvailableTimes = async (dateParam) => {
    const dateToUse = dateParam || selectedDate;
    if (!dateToUse || !accessToken || !selectedEventType) return;
    setLoadingTimes(true);
    setSubmitError("");
    try {
      // تأكد أن dateToUse كائن Date مع المنطقة الزمنية الصحيحة
      let dateObj = dateToUse;
      if (typeof dateToUse === "string") {
        dateObj = new Date(dateToUse + "T00:00:00+03:00");
      }
      const { startTime, endTime } = getDayRange(dateObj);

      const response = await getAvailableTimes(
        selectedEventType,
        startTime,
        endTime,
        accessToken
      );

      setAvailableTimes(response.collection || []);
    } catch (err) {
      setSubmitError(err.message);
      setAvailableTimes([]);
    } finally {
      setLoadingTimes(false);
    }
  };

  useEffect(() => {
    if (!selectedDate || !selectedEventType) return;
    loadAvailableTimes();
  }, [selectedDate, selectedEventType]);

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const nationalities = [
    "مصر",
    "السعودية",
    "الإمارات",
    "الكويت",
    "قطر",
    "البحرين",
    "عمان",
    "الأردن",
    "سوريا",
    "لبنان",
    "فلسطين",
    "العراق",
    "اليمن",
    "المغرب",
    "الجزائر",
    "تونس",
    "ليبيا",
    "السودان",
    "تركيا",
    "أخرى",
  ];

  const handleConfirmBooking = async () => {
    setBookingConfirmed(true);
  };

  return (
    <div>
      <Header />

      <main className="bg-gray-50 section min-h-screen">
        <div className="container max-w-4xl">
          {/* Progress Steps */}
          <div className="mb-12 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNumber
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step > stepNumber ? <CheckCircle size={16} /> : stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`w-12 h-0.5 mx-2 ${
                        step > stepNumber ? "bg-gray-900" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-8 gap-5 mt-4 text-sm">
              {[0, 1, 2].map((idx) => (
                <span
                  key={idx}
                  className={
                    step >= idx + 1
                      ? "text-gray-900 font-medium"
                      : "text-gray-500"
                  }
                >
                  {steps[idx]}
                </span>
              ))}
            </div>
          </div>

          <div className="card">
            {/* Step 1: Select Service */}
            {!preselectedService && step === 1 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {t("book.selectService")}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-6 border rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedService === service.id
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <h3 className="font-medium text-gray-900 mb-2">
                        {service.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          {service.duration} min
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    className="btn btn-primary"
                    disabled={!selectedService}
                    onClick={() => setStep(2)}
                  >
                    {t("book.continue")}
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Select Date & Time */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {t("book.yourInfo")}
                </h2>
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // تحقق من الحقول المطلوبة
                    if (
                      !userFormData.firstName ||
                      !userFormData.lastName ||
                      !userFormData.phone ||
                      !userFormData.nationality ||
                      !userFormData.dob
                    ) {
                      toast.error(t("book.requiredFieldsError"));
                      return;
                    }
                    setStep(3);
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("book.firstName")} *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="input"
                        required
                        value={userFormData.firstName}
                        onChange={handleUserFormChange}
                        // placeholder={t("book.firstNamePlaceholder")}/
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("book.lastName")} *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className="input"
                        required
                        value={userFormData.lastName}
                        onChange={handleUserFormChange}
                        // placeholder={t("book.lastNamePlaceholder")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("book.email")} ({t("book.optional")})
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="input"
                      value={userFormData.email}
                      onChange={handleUserFormChange}
                      // placeholder={t("book.emailPlaceholder/")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("book.phone")} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="input"
                      required
                      value={userFormData.phone}
                      onChange={handleUserFormChange}
                      // placeholder={t("book.phonePlaceholder")}
                    />
                    <span className="text-xs text-gray-500">
                      {t("book.phoneNote")}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("book.nationality")} *
                    </label>
                    <select
                      name="nationality"
                      className="input w-full"
                      required
                      value={userFormData.nationality}
                      onChange={handleUserFormChange}
                    >
                      <option value="">{t("book.nationalitySelect")}</option>
                      {nationalities.map((nat) => (
                        <option key={nat} value={nat}>
                          {nat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("book.dob")} *
                    </label>
                    <input
                      type="date"
                      name="dob"
                      className="input"
                      required
                      value={userFormData.dob}
                      onChange={handleUserFormChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("book.reason")} ({t("book.optional")})
                    </label>
                    <textarea
                      name="reason"
                      className="input resize-none"
                      value={userFormData.reason}
                      onChange={handleUserFormChange}
                      rows={2}
                      placeholder={t("book.reasonPlaceholder")}
                    />
                  </div>
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setStep(1)}
                    >
                      {t("book.back")}
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {t("book.continue")}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Personal Information */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {t("book.chooseDateTime")}
                </h2>
                <div className="mb-8">
                  <h3 className="font-medium text-gray-900 mb-4">
                    {t("book.selectDate")}
                  </h3>
                  <DatePicker
                    selectedDate={selectedDate ? new Date(selectedDate) : null}
                    onDateSelect={(date) =>
                      setSelectedDate(date.toISOString().split("T")[0])
                    }
                    minDate={new Date()}
                    onDaySelected={(date) => {
                      setSelectedDate(date); // احفظ كائن Date كامل
                      setSelectedDateTime(null);
                      // لا تستدعي loadAvailableTimes هنا
                    }}
                  >
                    <AvailableTimesList
                      availableTimes={availableTimes}
                      loading={loadingTimes}
                      error={submitError}
                      selectedDate={
                        selectedDate ? new Date(selectedDate) : null
                      }
                      onSelectTimeSlot={async (slot) => {
                        setIsSubmitting(true);
                        const serviceObj = services.find(
                          (s) => s.id === selectedService
                        );
                        const startDate = new Date(slot.start_time);
                        setSelectedDateTime(startDate); // احفظ التاريخ والوقت معًا
                        const formattedDate = startDate
                          .toISOString()
                          .split("T")[0];
                        const formattedTime = startDate
                          .toTimeString()
                          .slice(0, 5); // HH:mm
                        // Debug logs
                        console.log("selectedDate:", selectedDate);
                        console.log("selectedDateTime:", selectedDateTime);
                        console.log("startDate:", startDate);
                        console.log("formattedDate:", formattedDate);
                        console.log("formattedTime:", formattedTime);
                        console.log("startDate ISO:", startDate.toISOString());
                        try {
                          // فقط حفظ بيانات الحجز في Supabase بدون إنشاء event في Calendly
                          await saveAppointmentToSupabase({
                            service_id: selectedService,
                            service_name: serviceObj?.name || "",
                            first_name: userFormData.firstName,
                            last_name: userFormData.lastName,
                            email: userFormData.email,
                            phone: userFormData.phone,
                            nationality: userFormData.nationality,
                            date_of_birth: userFormData.dob,
                            reason: userFormData.reason,
                            appointment_date: formattedDate,
                            appointment_time: formattedTime,
                            price: serviceObj?.price || "",
                            status: "pending",
                            created_at: new Date().toISOString(),
                          });
                          toast.success(t("book.appointmentSuccess"));
                          setStep(4);
                          setUserFormData({
                            firstName: "",
                            lastName: "",
                            email: "",
                            phone: "",
                            nationality: "",
                            dob: "",
                            reason: "",
                          });
                        } catch (error) {
                          toast.error(error.message || t("book.bookingError"));
                        } finally {
                          setIsSubmitting(false);
                        }
                      }}
                    />
                  </DatePicker>
                </div>
                <div className="flex justify-between">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setStep(2)}
                  >
                    {t("book.back")}
                  </button>
                </div>
              </div>
            )}
            {/* Step 4: WhatsApp/contact message */}
            {step === 4 && (
              <div className="text-center py-16">
                {bookingConfirmed ? (
                  <div className="text-2xl font-semibold text-gray-700 mb-4">
                    {t("book.thankYouMsg")}
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                      {t("book.summary")}
                    </h2>
                    <div className="bg-gray-50 rounded-lg p-6 mb-6 text-right max-w-md mx-auto">
                      <div>
                        <b>{t("book.name")}:</b> {userFormData.firstName}{" "}
                        {userFormData.lastName}
                      </div>
                      <div>
                        <b>{t("book.phone")}:</b> {userFormData.phone}
                      </div>
                      <div>
                        <b>{t("book.service")}:</b>{" "}
                        {services.find((s) => s.id === selectedService)?.name ||
                          selectedService}
                      </div>
                      <div>
                        <b>{t("book.price")}:</b>{" "}
                        {services.find((s) => s.id === selectedService)
                          ?.price || "-"}{" "}
                        {t("book.egp")}
                      </div>
                      <div>
                        <b>{t("book.appointment")}:</b>{" "}
                        {selectedDate &&
                          selectedDate.toLocaleDateString("ar-EG")}{" "}
                        {selectedDateTime &&
                          selectedDateTime.toLocaleTimeString("ar-EG", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </div>
                    </div>
                    <div className="flex justify-center gap-4">
                      <button
                        className="btn btn-primary"
                        onClick={handleConfirmBooking}
                      >
                        {t("book.confirmBooking")}
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setStep(3)}
                      >
                        {t("book.editInfo")}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
