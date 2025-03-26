import PropTypes from "prop-types";

export const SkeletonLoading = ({ width, height }) => {
  return (
    <>
      <style>
        {`
              @keyframes pulse {
                0% {
                  opacity: 0.6;
                }
                50% {
                  opacity: 1;
                }
                100% {
                  opacity: 0.6;
                }
              }
            `}
      </style>
      <div
        style={{
          width: width || "100%",
          height: height || "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: "8px",
          animation: "pulse 1s infinite ease-in-out",
        }}
      />
    </>
  );
};

SkeletonLoading.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};
