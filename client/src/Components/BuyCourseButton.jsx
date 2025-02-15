import React, { useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] =
    useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession({ courseId: courseId.toString() }); // Ensure courseId is passed as a string
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url; // Redirect to checkout URL
      } else {
        toast.error("Invalid response from server.");
      }
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to create checkout session.");
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Button disabled={isLoading} onClick={purchaseCourseHandler} className="w-full">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

// Add PropTypes validation
BuyCourseButton.propTypes = {
  courseId: PropTypes.string.isRequired, // Validate courseId prop
};

export default BuyCourseButton;
