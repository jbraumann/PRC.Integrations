from queue import Queue
import datetime
import threading

class SharedData:
    #robot_id is the unique ID of the robot
    robot_id = "PRC_Test_Fusion"
    #xforms are the transformation matrices of the robot's joints
    robot_xforms = [None] * 7
    #tool values of the robot as XYZABC
    tool_vals = [0,0,0,0,0,0,0]
    #base values of the robot as XYZABC
    base_vals = [0,0,0,0,0,0,0]
    #transformation of the TCP for placing the coordinate system
    robot_tcp = None
    #settings_dictionary stores the settings of the robot
    settings_dictionary = None
    #stub is the GRPC object that will be used to communicate with the PRC server
    stub = None

    # various lists to store and buffer data from the robot
    meshBuffer = []
    tcpMeshBuffer = []
    nameBuffer = []
    inputMatrices = []
    colorBuffer = []
    axisAlarm = []
    feedback_field = None
    feedback_buffer = Queue(10)
    feedback = ""
    graphics = None
    app = None
    stop_event = threading.Event()

    def UpdateFeedback(self, feedback_in):
        feedback_in = str(datetime.datetime.now()) + " - " + "<b>" + feedback_in + "</b>" + "\n"
        if self.feedback_buffer.full():
            self.feedback_buffer.get()
        self.feedback_buffer.put(feedback_in)

        str_feedback_array = []
        for feedback_data in self.feedback_buffer.queue:
            str_feedback_array.append(feedback_data)

        str_feedback_array.reverse()
        str_feedback = ''.join(str_feedback_array)

        self.feedback = str_feedback
        self.app.fireCustomEvent('prcFeedbackEvent', '') 

