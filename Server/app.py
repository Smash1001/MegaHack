from flask import Flask, jsonify, request
from flask_cors import CORS
import mathgenerator
import random

app = Flask(__name__)
CORS(app)


@app.route('/question/', methods=['GET'])
def getQuestion():
    problem = ""
    solution = ""
    questionType = ""

    category = request.args.get("category")
    if (request.method == "GET"):
        # return questions for basic math category
        if (category == "basic_math"):
            list = [0, 1, 2, 3, 4]
            index = random.choice(list)
            if (index == 0):
                problem, solution = mathgenerator.addition()

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("=", "")
                solution = solution.replace("$", "")

                questionType = "Addition"
            if (index == 1):
                problem, solution = mathgenerator.subtraction()

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("=", "")
                solution = solution.replace("$", "")

                questionType = "Subtraction"
            if (index == 2):
                problem, solution = mathgenerator.multiplication(12)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("=", "")
                problem = problem.replace("\cdot", "*")
                solution = solution.replace("$", "")

                questionType = "Multiplication"
            if (index == 3):
                problem, solution = mathgenerator.division(12, 12)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("=", "")
                problem = problem.replace("\div", "/")
                solution = solution.replace("$", "")

                questionType = "Division"
            if (index == 4):
                problem, solution = mathgenerator.square_root(1, 12)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("\sqrt{", "√")
                problem = problem.replace("}", "")
                problem = problem.replace("=", "")
                solution = solution.replace("$", "")

                questionType = "Square Root"

        # return questions for algebra
        if (category == "algebra"):
            list = [0, 1, 2, 3, 4]
            index = random.choice(list)

            if (index == 0):
                problem, solution = mathgenerator.basic_algebra(10)

                # return string cleanup
                problem = problem.replace("$", "")
                solution = solution.replace("$", "")

                questionType = "Basic Algebra (Solve for x)"
            if (index == 1):
                problem, solution = mathgenerator.combine_like_terms(10, 3, 5)

                # check for only one nomial
                while (problem.find("+") == -1):
                    problem, solution = mathgenerator.combine_like_terms(
                        10, 3, 5)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("{", "")
                problem = problem.replace("}", "")
                problem = problem.replace("^1", "")
                solution = solution.replace("$", "")
                solution = solution.replace("{", "")
                solution = solution.replace("}", "")
                solution = solution.replace("^1", "")
                solution = solution.replace(" + ", "+")

                questionType = "Combining Like Terms"
            if (index == 2):
                problem, solution = mathgenerator.expanding(10, 10, 10, 10)

                # return string cleanup
                problem = problem.replace("$", "")
                solution = solution.replace("$", "")

                questionType = "Expanding Polynomials"
            if (index == 3):
                problem, solution = mathgenerator.linear_equations(2, 10, 10)

                # return string cleanup
                problem = problem.replace("$", "")
                solution = solution.replace("$", "")
                solution = solution.replace(" = ", "")
                solution = solution.replace("x", "")
                solution = solution.replace(" y", "")

                questionType = "Linear Equations"
            if (index == 4):
                problem, solution = mathgenerator.system_of_equations(
                    10, 10, 10)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("y.", "y")
                solution = solution.replace("$", "")
                solution = solution.replace(" = ", "")
                solution = solution.replace("x", "")
                solution = solution.replace(" y", "")

                questionType = "System of Equations"

        # return questions for geometry
        if (category == "geometry"):
            list = []
            for i in range(12):
                list.append(i)
            index = random.choice(list)
            if (index == 0):
                problem, solution = mathgenerator.area_of_circle(20)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("=", "")
                solution = solution.replace("$", "")

                questionType = "Area of a Circle"
            if (index == 1):
                problem, solution = mathgenerator.area_of_triangle(10, 10)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace(",", "")
                problem = problem.replace("=", "")
                solution = solution.replace("$", "")

                questionType = "Area of a Triangle"
            if (index == 2):
                problem, solution = mathgenerator.circumference(20)

                # Check if answer is 0
                while (solution == "0.0"):
                    problem, solution = mathgenerator.circumference(20)

                # return string cleanup
                problem = problem.replace("$", "")
                solution = solution.replace("$", "")

                questionType = "Circumference"
            if (index == 3):
                problem, solution = mathgenerator.perimeter_of_polygons(5)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("cm is: ", "")
                # problem = problem.replace(" = ", "")
                solution = solution.replace("$", "")

                questionType = "Perimeter of Polygons"
            if (index == 4):
                problem, solution = mathgenerator.perimeter_of_polygons(5)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("cm is: ", "")
                # problem = problem.replace(" = ", "")
                solution = solution.replace("$", "")

                questionType = "Perimeter of Polygons"
            if (index == 5):
                problem, solution = mathgenerator.surface_area_cube(10)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("m is", "")
                solution = solution.replace("$", "")
                solution = solution.replace(" m^2", "")

                questionType = "Surface Area of a Cube"
            if (index == 6):
                problem, solution = mathgenerator.surface_area_cylinder(20, 10)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("m is", "")
                problem = problem.replace("m ", " ")
                solution = solution.replace("$", "")
                solution = solution.replace(" m^2", "")

                questionType = "Surface Area of a Cylinder"
            if (index == 7):
                problem, solution = mathgenerator.surface_area_pyramid()

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("m is", "")
                problem = problem.replace("m, ", ", ")
                solution = solution.replace("$", "")
                solution = solution.replace(" m^2", "")

                questionType = "Surface Area of a Pyramid"
            if (index == 8):
                problem, solution = mathgenerator.surface_area_sphere(10)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("m ", " ")
                # problem = problem.replace("m ", ", ")
                solution = solution.replace("$", "")
                solution = solution.replace(" m^2", "")

                questionType = "Surface Area of a Sphere"
            if (index == 9):
                problem, solution = mathgenerator.volume_cube(10)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("m ", " ")
                # problem = problem.replace("m ", ", ")
                solution = solution.replace("$", "")
                solution = solution.replace(" m^3", "")

                questionType = "Volume of a Cube"
            if (index == 10):
                problem, solution = mathgenerator.volume_cylinder(20, 10)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("m ", " ")
                # problem = problem.replace("m ", ", ")
                solution = solution.replace("$", "")
                solution = solution.replace(" m^3", "")

                questionType = "Volume of a Cylinder"
            if (index == 11):
                problem, solution = mathgenerator.volume_pyramid(20, 20, 20)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("m ", " ")
                # problem = problem.replace("m ", ", ")
                solution = solution.replace("$", "")
                solution = solution.replace(" m^3", "")

                questionType = "Volume of a Pyramid"
            if (index == 11):
                problem, solution = mathgenerator.volume_sphere(20)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("m ", " ")
                problem = problem.replace(" = ", "")
                solution = solution.replace("$", "")
                solution = solution.replace(" m^3", "")

                questionType = "Volume of a Sphere"

    return jsonify({
        "problem": problem,
        "solution": solution,
        "type": questionType
    })


if __name__ == "__main__":
    app.run(debug=True)
