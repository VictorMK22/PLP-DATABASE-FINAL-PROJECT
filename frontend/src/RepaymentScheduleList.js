// frontend/src/components/RepaymentScheduleList.js
import { useState, useEffect } from "react";
import { getRepaymentSchedules, updateRepaymentScheduleStatus } from "./api";

const RepaymentScheduleList = () => {
  const [repaymentSchedules, setRepaymentSchedules] = useState([]);

  useEffect(() => {
    const fetchRepaymentSchedules = async () => {
      try {
        const schedules = await getRepaymentSchedules();
        setRepaymentSchedules(schedules);
      } catch (error) {
        console.error("Error fetching repayment schedules:", error);
      }
    };

    fetchRepaymentSchedules();
  }, []);

  const handleStatusChange = async (scheduleId, status) => {
    try {
      await updateRepaymentScheduleStatus(scheduleId, status);
      setRepaymentSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule.schedule_id === scheduleId
            ? { ...schedule, status }
            : schedule
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="content">
      <h2>Repayment Schedules</h2>
      <ol>
        {repaymentSchedules.map((schedule) => (
          <li key={schedule.schedule_id}>
            <div>
              <strong>Due Date:</strong> {schedule.due_date} |
              <strong> Amount Due:</strong> {schedule.amount_due} |
              <strong>Status:</strong> {schedule.status}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RepaymentScheduleList;
