/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.HibernateUtil;
import hibernate.User;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author CMOS
 */
@WebServlet(name = "SignIn", urlPatterns = {"/SignIn"})
public class SignIn extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        User u = new User();
        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);
        HttpSession ses = request.getSession();

        JsonObject user = gson.fromJson(request.getReader(), JsonObject.class);
        String email = user.get("email").getAsString();
        String password = user.get("password").getAsString();

        if (email.isEmpty()) {
            responseObject.addProperty("alerts", "Please enter your email!");
        } else if (password.isEmpty()) {
            responseObject.addProperty("alerts", "Please enter your password!");
        } else {
            if (ses.getAttribute("email") == null) {

                SessionFactory sf = HibernateUtil.getSessionFactory();
                Session s = sf.openSession();
                Criteria c1 = s.createCriteria(User.class);
                Criterion crt1 = Restrictions.eq("email", email);
                Criterion crt2 = Restrictions.eq("password", password);

                c1.add(crt1);
                c1.add(crt2);

                if (c1.list().isEmpty()) {
                    responseObject.addProperty("alerts", 1);
                }
            }
        }

    }

}
